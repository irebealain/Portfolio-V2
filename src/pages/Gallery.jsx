import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Play, Calendar, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
    const rootRef = useRef(null)
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [isSelectionMode, setIsSelectionMode] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Gallery items fade in
            gsap.from('.gallery-item', {
                opacity: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: 'power2.out',
            })
        }, rootRef)
        return () => ctx.revert()
    }, [selectedCategory])

    // EASY TO UPDATE: Just add new items to this array!
    const galleryItems = [
        {
            id: 1,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
            title: 'ASYV Graduation Day 2025',
            description: 'Celebrating the completion of my high school journey at Agahozo-Shalom Youth Village.',
            category: 'Education',
            date: 'Thu 15 May',
            location: 'Rwamagana, Rwanda',
            aspectRatio: 'landscape' // landscape, portrait, square
        },
        {
            id: 2,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop',
            title: 'ASYV Hackathon 2024',
            description: 'Organizing the first-ever ASYV Hackathon with Byte Builders.',
            category: 'Tech Events',
            date: 'Thu 15 May',
            location: 'ASYV, Rwanda',
            aspectRatio: 'landscape'
        },
        {
            id: 3,
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop',
            title: 'Career Connect Hub Launch',
            description: 'Launch event connecting students with mentors.',
            category: 'Projects',
            date: 'Thu 15 May',
            location: 'Kigali, Rwanda',
            aspectRatio: 'landscape'
        },
        {
            id: 4,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop',
            title: 'Team Building at Growth Wave',
            description: 'Working with the amazing team at Growth Wave.',
            category: 'Work',
            date: 'Thu 15 May',
            location: 'Kigali, Rwanda',
            aspectRatio: 'portrait'
        },
        {
            id: 5,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop',
            title: 'Entrepreneurship Challenge',
            description: 'Ranked 2nd runner-up in provincial competition.',
            category: 'Awards',
            date: 'Thu 15 May',
            location: 'Rwanda',
            aspectRatio: 'landscape'
        },
        {
            id: 6,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=400&auto=format&fit=crop',
            title: 'STEM Day 2024 Winner',
            description: 'Winning Best STEAM Project with automobile cane.',
            category: 'Awards',
            date: 'Thu 15 May',
            location: 'ASYV',
            aspectRatio: 'square'
        },
        {
            id: 7,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop',
            title: 'Coding Workshop',
            description: 'Teaching HTML, CSS, and JavaScript at Byte Builders.',
            category: 'Tech Events',
            date: 'Thu 15 May',
            location: 'ASYV',
            aspectRatio: 'landscape'
        },
        {
            id: 8,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop',
            thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=400&auto=format&fit=crop',
            title: 'Weekend in Kigali',
            description: 'Exploring the beautiful city with friends.',
            category: 'Personal',
            date: 'Thu 15 May',
            location: 'Kigali',
            aspectRatio: 'portrait'
        }
    ]

    const categories = ['all', ...new Set(galleryItems.map(item => item.category))]
    const filteredItems = selectedCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === selectedCategory)

    const openLightbox = (item, index) => {
        if (isSelectionMode) {
            toggleSelection(item.id)
        } else {
            setSelectedMedia(item)
            setCurrentIndex(index)
        }
    }

    const closeLightbox = () => {
        setSelectedMedia(null)
    }

    const navigateMedia = (direction) => {
        const newIndex = direction === 'next' 
            ? (currentIndex + 1) % filteredItems.length 
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length
        setCurrentIndex(newIndex)
        setSelectedMedia(filteredItems[newIndex])
    }

    const toggleSelection = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const getAspectClass = (ratio) => {
        switch(ratio) {
            case 'portrait': return 'row-span-2'
            case 'square': return 'aspect-square'
            default: return 'aspect-video'
        }
    }

    return (
        <div ref={rootRef} className="min-h-screen">
            {/* Google Photos Style Header */}
            <div className="sticky top-0 z-40 border-b border-white/10 w-[80%]">
                <div className="px-4 py-3 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium">Photos</h1>
                        {selectedItems.length > 0 && (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-white/70">{selectedItems.length} selected</span>
                                <button 
                                    onClick={() => {
                                        setSelectedItems([])
                                        setIsSelectionMode(false)
                                    }}
                                    className="text-sm text-accent hover:text-accent/80"
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Pills */}
            <div className="sticky z-30 px-4 py-3 mx-auto backdrop-blur-sm top-14 max-w-7xl">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                                selectedCategory === category
                                    ? 'bg-accent text-accent-fore'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Header (Google Photos Style) */}
            <div className="px-4 py-6 mx-auto max-w-7xl">
                <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-medium">Thu 15 May</h2>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Google Photos Masonry Grid */}
                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => openLightbox(item, index)}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                setIsSelectionMode(true)
                                toggleSelection(item.id)
                            }}
                            className={`gallery-item relative overflow-hidden bg-black cursor-pointer group ${getAspectClass(item.aspectRatio)}`}
                        >
                            {/* Selection Checkbox */}
                            {(isSelectionMode || selectedItems.includes(item.id)) && (
                                <div className="absolute z-10 top-2 left-2">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        selectedItems.includes(item.id)
                                            ? 'bg-accent border-accent'
                                            : 'bg-black/50 border-white/70 backdrop-blur-sm'
                                    }`}>
                                        {selectedItems.includes(item.id) && <Check className="w-4 h-4 text-accent-fore" />}
                                    </div>
                                </div>
                            )}

                            {/* Image */}
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />

                            {/* Video Play Icon */}
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm">
                                        <Play className="w-6 h-6" fill="white" />
                                    </div>
                                </div>
                            )}

                            {/* Hover Overlay (subtle like Google Photos) */}
                            <div className="absolute inset-0 transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal (Google Photos Style) */}
            {selectedMedia && (
                <div className="fixed inset-0 z-50 bg-black">
                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                        <button
                            onClick={closeLightbox}
                            className="p-2 transition-colors rounded-full hover:bg-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="text-sm text-white/80">
                            {currentIndex + 1} / {filteredItems.length}
                        </div>
                    </div>

                    {/* Navigation */}
                    <button
                        onClick={() => navigateMedia('prev')}
                        className="absolute z-10 p-3 transition-colors rounded-full left-4 top-1/2 -translate-y-1/2 hover:bg-white/10"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={() => navigateMedia('next')}
                        className="absolute z-10 p-3 transition-colors rounded-full right-4 top-1/2 -translate-y-1/2 hover:bg-white/10"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Main Image/Video */}
                    <div className="flex items-center justify-center w-full h-full p-16">
                        {selectedMedia.type === 'image' ? (
                            <img
                                src={selectedMedia.url}
                                alt={selectedMedia.title}
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <div className="w-full max-w-5xl aspect-video">
                                <iframe
                                    src={selectedMedia.url}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="mb-2 text-xl font-medium">{selectedMedia.title}</h3>
                        <p className="mb-3 text-sm text-white/70">{selectedMedia.description}</p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {selectedMedia.date}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {selectedMedia.location}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}