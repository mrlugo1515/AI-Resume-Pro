export default function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl border border-border ${
        padding ? 'p-6' : ''
      } ${hover ? 'hover:shadow-lg hover:border-primary-200 transition-all duration-200' : 'shadow-sm'} ${className}`}
    >
      {children}
    </div>
  );
}