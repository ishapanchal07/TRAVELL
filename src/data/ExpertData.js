export const EXPERTS = [
    {
        id: '1',
        name: 'Amélie L.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        price: 180,
        description: '"Capturing the golden hour at Louvre"',
        bio: 'Professional photographer with 5+ years of experience in capturing stunning travel memories. Specialized in street photography and finding hidden aesthetic spots in Paris.',
        category: 'PHOTOGRAPHY',
        rating: 4.9,
        reviewCount: 124,
        languages: ['English', 'French'],
        status: 'Available', // Available, Busy, Offline
        portfolio: [
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1550114891-229efb721330?auto=format&fit=crop&q=80&w=400'
        ],
        reviews: [
            { id: 'r1', user: 'Sarah K.', rating: 5, comment: 'Amélie was amazing! She knows exactly where the best light is.', date: '2 days ago' },
            { id: 'r2', user: 'John D.', rating: 4, comment: 'Great experience, very professional.', date: '1 week ago' }
        ]
    },
    {
        id: '2',
        name: 'Julien B.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        price: 220,
        description: '"Paris\' hidden jazz & wine spots"',
        bio: 'Jazz enthusiast and sommelier. I will take you to the bars where locals hang out, away from the tourist traps.',
        category: 'NIGHTLIFE',
        rating: 4.8,
        reviewCount: 98,
        languages: ['English', 'French', 'Spanish'],
        status: 'Busy',
        portfolio: [
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400'
        ],
        reviews: [
            { id: 'r3', user: 'Elena P.', rating: 5, comment: 'Best night in Paris ever! The wine was exquisite.', date: '3 days ago' }
        ]
    },
    {
        id: '3',
        name: 'Léa M.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        price: 160,
        description: '"Le Marais\' secret fashion alleys"',
        bio: 'Fashion stylist working with top designers. I’ll help you find the best vintage shops and boutiques in the heart of Marais.',
        category: 'CHIC STYLE',
        rating: 4.7,
        reviewCount: 76,
        languages: ['English', 'French', 'Italian'],
        status: 'Available',
        portfolio: [
            'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400'
        ],
        reviews: [
            { id: 'r4', user: 'Mike R.', rating: 5, comment: 'Incredible taste! Found some pieces I would never have seen.', date: '5 days ago' }
        ]
    },
    {
        id: '4',
        name: 'Marc R.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        price: 190,
        description: '"The untold stories of Montmartre"',
        bio: 'History professor with a passion for storytelling. Discover the rich history of artists and revolution in Montmartre.',
        category: 'HISTORY',
        rating: 4.9,
        reviewCount: 204,
        languages: ['English', 'French', 'German'],
        status: 'Offline',
        portfolio: [
            'https://images.unsplash.com/photo-1610450949065-1f2809630328?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1502602723352-841f73638a7c?auto=format&fit=crop&q=80&w=400'
        ],
        reviews: [
            { id: 'r5', user: 'Anna S.', rating: 5, comment: 'So much knowledge! Marc is a brilliant storyteller.', date: '1 month ago' }
        ]
    }
];
