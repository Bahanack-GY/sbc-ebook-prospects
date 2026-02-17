import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, AlertCircle, ArrowLeft } from 'lucide-react';
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

  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
        localStorage.setItem('sbc_admin_ref', refParam);
    }
  }, [searchParams]);

  // Try static first, then dynamic
  const staticEbook = id ? EBOOKS[id] : null;
  const ebook = staticEbook || dynamicEbook;

  useEffect(() => {
    if (!id) {
        // Fetch list and use first one
        setEbookLoading(true);
        fetch('https://api.sniperbusinessebook.online/ebooks/public')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const first = data[0];
                    setDynamicEbook({
                        id: first._id,
                        title: first.title,
                        description: first.description,
                        image: first.coverUrl,
                        pdfUrl: first.pdfUrl
                    });
                }
            })
            .catch(err => console.error("Failed to load default ebook", err))
            .finally(() => setEbookLoading(false));
    } else if (id && !staticEbook) {
        setEbookLoading(true);
        fetch(`https://api.sniperbusinessebook.online/ebooks/public/${id}`)
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
            ebookId: ebook.id, // Use the actual ebook object's ID
            adminId: adminId || undefined
        };
        
        await fetch('https://api.sniperbusinessebook.online/prospects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        navigate(`/thank-you?ebookId=${ebook.id}`);
    } catch (err: unknown) {
        console.error(err);
        setError("Une erreur est survenue.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-slate-50">
      
      {/* Logo */}
      <motion.img 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        src={Logo} 
        alt="SBC Logo" 
        className="h-16 mb-8"
      />

      {/* Back Button */}
      <Link to="/" className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <Button variant="ghost" className="flex items-center text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden md:inline">Retour</span>
        </Button>
      </Link>

      <div className="max-w-3xl w-full flex flex-col items-center space-y-8">
        
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Comment commencer à générer tes premiers revenus grâce à la revente des produits digitaux
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Télécharge gratuitement le guide pratique qui t'explique étape par étape comment démarrer, même si tu es débutant et sans expérience technique.
          </p>
        </motion.div>

        {/* Capture Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Card className="border-t-4 border-t-blue-600 shadow-xl">
            <div className="mb-6 text-center">
              <p className="text-slate-700 font-medium">
                Remplis ton nom, prénom, ton WhatsApp et ton adresse mail pour recevoir le guide immédiatement
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="firstName" 
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input 
                  name="lastName" 
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Input 
                name="whatsapp" 
                placeholder="Numéro WhatsApp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
              
              <Input 
                name="email" 
                placeholder="Adresse Email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {error && (
                <div className="flex items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" isLoading={loading} variant="primary" className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-600/20">
                <Download className="w-5 h-5 mr-2" />
                Recevoir le guide pour commencer à gagner en ligne
              </Button>

              <p className="text-xs text-slate-400 text-center mt-2">
                Vos informations sont 100% sécurisées.
              </p>
            </form>
          </Card>
        </motion.div>

        {/* Flyer / Ebook Image (Bottom) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="w-full max-w-md"
        >
            {ebook.image ? (
                <img 
                  src={ebook.image} 
                  alt={ebook.title} 
                  className="w-full rounded-xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500"
                />
            ) : (
                <div className="w-full aspect-3/4 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border border-slate-100">
                    <img src={LogoSBC} alt="SBC" className="h-16 w-auto mb-6" />
                    <h3 className="text-xl font-bold text-blue-600">{ebook.title}</h3>
                </div>
            )}
        </motion.div>

      </div>
    </div>
  );
}
