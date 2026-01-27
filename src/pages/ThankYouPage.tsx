
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Logo from '../assets/logo.png';

export default function ThankYouPage() {

  // const ebookId = searchParams.get('ebookId'); // Can be used to personalize

  const salesLink = "https://example.com/sales-page"; 
  const whatsappLink = "https://whatsapp.com/channel/0029Vav3mvCElah05C8QuT03"; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.img 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        src={Logo} 
        alt="SBC Logo" 
        className="h-12 mb-8 absolute top-8 left-8"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        <Card className="text-center pt-12 pb-12 border-t-4 border-t-green-500">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            Félicitations !
          </h1>
          
          <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
            Votre Ebook est en route vers votre email.<br/>
            En attendant, voici une opportunité exclusive sélectionnée pour vous :
          </p>

          <div className="space-y-4 max-w-sm mx-auto">
            <a href={salesLink} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="primary" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Gagner 10.000 FCFA/Jour (SBC)
              </Button>
            </a>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-medium">Ou</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Rejoindre la Communauté
              </Button>
            </a>
          </div>
        </Card>
        
        <div className="mt-8 text-center text-slate-400 text-sm">
            <Link to="/" className="hover:text-blue-500 transition-colors">Retour à l'accueil</Link>
        </div>
      </motion.div>
    </div>
  );
}
