export interface Ebook {
    id: string;
    title: string;
    description: string;
    image: string;
}

export const EBOOKS: Record<string, Ebook> = {
    "1": {
        id: "1",
        title: "Comment Gagner 10.000 FCFA/Jour avec la SBC",
        description: "Le guide ultime pour générer des revenus quotidiens grâce au Sniper Business Center. Stratégies éprouvées et plan d'action immédiat.",
        image: "https://placehold.co/600x800/18181b/ffffff?text=Ebook+Cover" // Placeholder
    },
    "2": {
        id: "2",
        title: "Les Secrets du Ecommerce en Afrique",
        description: "Découvrez comment lancer une boutique en ligne rentable en Afrique sans stock initial.",
        image: "https://placehold.co/600x800/18181b/ffffff?text=Ebook+Cover+2"
    },
    "3": {
        id: "3",
        title: "Maîtriser la Publicité Facebook",
        description: "Apprenez à cibler vos clients idéaux et à transformer vos clics en ventes.",
        image: "https://placehold.co/600x800/18181b/ffffff?text=Ebook+Cover+3"
    },
    "4": {
        id: "4",
        title: "L'Art de la Vente WhatsApp",
        description: "Comment transformer votre WhatsApp en machine à vendre automatisée.",
        image: "https://placehold.co/600x800/18181b/ffffff?text=Ebook+Cover+4"
    }
};
