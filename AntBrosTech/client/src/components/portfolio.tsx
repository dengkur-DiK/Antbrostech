import { useQuery } from "@tanstack/react-query";

export default function Portfolio() {
  const { data: portfolioItems = [], isLoading } = useQuery({
    queryKey: ['/api/portfolio'],
    queryFn: () => fetch('/api/portfolio').then(res => res.json())
  });

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-4">Our Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Loading our latest work...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing our expertise in tech photography, creative workspaces, and collaborative projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item rounded-xl overflow-hidden fade-in" style={{ backgroundColor: 'var(--dark-secondary)' }}>
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
