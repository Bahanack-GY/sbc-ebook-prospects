import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './ui/Card'; // Assuming Card exists in ui
import { Link } from 'react-router-dom';
import LogoSBC from '../assets/logo-sbc.png';

interface Ebook {
    _id: string;
    title: string;
    description: string;
    coverUrl: string;
    pdfUrl: string;
}

export const EbookGrid = () => {
    const [ebooks, setEbooks] = useState<Ebook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                // Hardcoded URL for now, matching other parts of app or use env if available
                const response = await axios.get('https://api.sniperbusinessebook.online/ebooks/public');
                setEbooks(response.data);
            } catch (error) {
                console.error('Failed to fetch ebooks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEbooks();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Chargement des ressources...</div>;
    }

    if (ebooks.length === 0) {
        return null; // Don't show section if empty
    }

    return (
        <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ebooks.map((ebook) => (
                    <Link 
                        key={ebook._id} 
                        to={`/capture/${ebook._id}`}
                        className="block group h-full"
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden  flex flex-col">
                                <div className="aspect-[3/4] bg-slate-200 overflow-hidden relative">
                                    {ebook.coverUrl ? (
                                        <img 
                                            src={ebook.coverUrl} 
                                            alt={ebook.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-6 text-center">
                                            <img src={LogoSBC} alt="SBC" className="h-8 w-auto mb-3 opacity-80" />
                                            <p className="text-blue-600 font-bold text-sm leading-tight line-clamp-3">
                                                {ebook.title}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                        {ebook.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-3">
                                        {ebook.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
    );
};
