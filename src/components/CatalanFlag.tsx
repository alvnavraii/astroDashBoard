interface CatalanFlagProps {
    className?: string;
}

export default function CatalanFlag({ className = '' }: CatalanFlagProps) {
    return (
        <svg 
            className={className} 
            viewBox="0 0 900 600" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="900" height="600" fill="#FCDD09"/>
            <path stroke="#DA121A" strokeWidth="60" d="M0 120h900M0 240h900M0 360h900M0 480h900"/>
        </svg>
    );
} 