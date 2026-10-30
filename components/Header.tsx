"use client";

const navLinks = [
    { id: 'about', label: 'Overview' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
];

const Header = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center backdrop-blur-sm bg-white/70 border-b border-black/5 text-[#0D365E] transition-all duration-300">
            <div className="tracking-widest w-28 max-md:w-20">
                {/* <img src="/assets/Rocky-Logo-White.svg" alt="SOBHA Logo" /> */}
                <img src="/assets/rocky-logo-original.svg" alt="SOBHA Logo" />
            </div>
            <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light">
                {navLinks.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => scrollToSection(id)}
                        className="hover:text-[#008B95] transition-colors relative group"
                    >
                        {label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#008B95] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                ))}
            </div>
            {/* <MagneticButton className="border border-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                Inquire
            </MagneticButton> */}
        </nav>
    )
}

export default Header
