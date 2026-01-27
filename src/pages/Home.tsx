import { useSearchParams } from 'react-router-dom';
import { EbookGrid } from '../components/EbookGrid';
// import { EBOOKS } from '../data/ebooks'; // Not used in render anymore
// import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png';
import { useEffect } from 'react';

function Home() {
    const [searchParams] = useSearchParams();
    const adminRef = searchParams.get('ref');

    useEffect(() => {
        if (adminRef) {
            localStorage.setItem('sbc_admin_ref', adminRef);
        }
    }, [adminRef]);

    return (
        <div className="min-h-screen p-8 flex flex-col items-center">
            {/* Logo */}
            <motion.img 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                src={Logo} 
                alt="SBC Logo" 
                className="h-16 mb-8"
            />

            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold mb-12 text-center text-slate-800"
            >
                Bibliothèque d'Ebooks
            </motion.h1>
            
            <EbookGrid />
            
           
        </div>
    )
}

export default Home;