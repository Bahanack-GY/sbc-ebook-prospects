import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { EBOOKS } from '../data/ebooks';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Logo from '../assets/logo.png';
import LogoSBC from '../assets/logo-sbc.png';

export default function CapturePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Get ref from URL or localStorage
  const adminId = searchParams.get('ref') || localStorage.getItem('sbc_admin_ref');
  
  const [dynamicEbook, setDynamicEbook] = useState<any>(null);
  const [ebookLoading, setEbookLoading] = useState(false);

  // Try static first, then dynamic
  const staticEbook = id ? EBOOKS[id] : null;
  const ebook = staticEbook || dynamicEbook;

  useEffect(() => {
    if (id && !staticEbook) {
        setEbookLoading(true);
        fetch(`http://localhost:3000/ebooks/public/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                // Adapt backend data to frontend shape if needed, or use as is
                setDynamicEbook({
                    id: data._id,
                    title: data.title,
                    description: data.description,
                    image: data.coverUrl, // Backend returns coverUrl
                    pdfUrl: data.pdfUrl // Backend returns pdfUrl
                });
            })
            .catch(err => console.error("Failed to load ebook", err))
            .finally(() => setEbookLoading(false));
    }
  }, [id, staticEbook]);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('sbc_user_data');
    return saved ? JSON.parse(saved) : {
        firstName: '',
        lastName: '',
        whatsapp: '',
        email: ''
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (ebookLoading) {
     return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!ebook) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-800">
        <h1 className="text-2xl font-bold">Ebook non trouvé</h1>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => {
        const next = { ...prev, [e.target.name]: e.target.value };
        localStorage.setItem('sbc_user_data', JSON.stringify(next));
        return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.firstName || !formData.lastName || !formData.whatsapp || !formData.email) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    try {
        const payload = {
            ...formData,
            ebookId: id,
            adminId: adminId || undefined
        };
        
        await fetch('http://localhost:3000/prospects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        navigate(`/thank-you?ebookId=${id}`);
    } catch (err: unknown) {
        console.error(err);
        setError("Une erreur est survenue.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Logo */}
      <motion.img 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        src={Logo} 
        alt="SBC Logo" 
        className="h-12 mb-8 md:absolute md:top-8 md:left-8"
      />

      {/* Back Button */}
      <Link to="/" className="absolute top-8 right-8 z-10">
        <Button variant="ghost" className="flex items-center text-slate-500 hover:text-slate-800 rounded-2xl">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden md:inline">Retour</span>
        </Button>
      </Link>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Ebook Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1 space-y-8"
        >
          <div className="relative group perspective-1000">
             {/* Simple shadow/glow instead of colored blur */}
             <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            {ebook.image ? (
                <img 
                  src={ebook.image} 
                  alt={ebook.title} 
                  className="relative w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-2xl shadow-blue-900/10 transform transition-transform duration-500 hover:scale-[1.02]"
                />
            ) : (
                <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-lg shadow-2xl shadow-blue-900/10 bg-slate-50 aspect-[3/4] flex flex-col items-center justify-center p-8 text-center transform transition-transform duration-500 hover:scale-[1.02]">
                    <img src={LogoSBC} alt="SBC" className="h-16 w-auto mb-6" />
                    <h3 className="text-xl md:text-2xl font-bold text-blue-600 leading-tight">
                        {ebook.title}
                    </h3>
                </div>
            )}
          </div>
          
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {ebook.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {ebook.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Gratuit
               </div>
               <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Instantané
               </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Capture Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 md:order-2"
        >
          <Card className="border">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Téléchargez votre copie</h2>
              <p className="text-slate-500 text-sm">Remplissez le formulaire pour accès immédiat.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="firstName" 
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input 
                  name="lastName" 
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              
              <Input 
                name="whatsapp" 
                placeholder="Numéro WhatsApp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
              />
              
              <Input 
                name="email" 
                placeholder="Adresse Email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              {error && (
                <div className="flex items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" isLoading={loading} variant="primary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Recevoir mon Ebook
              </Button>

              <p className="text-xs text-slate-400 text-center mt-4">
                Vos informations sont sécurisées.
              </p>
            </form>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
