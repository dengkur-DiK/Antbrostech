export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12" style={{ backgroundColor: 'var(--dark-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">About AntBros</h2>
            <p className="text-xl text-gray-300 mb-6">
              We are a creative photography studio specializing in technology, innovation, and collaborative storytelling. Our team combines technical expertise with artistic vision to create compelling visual narratives.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              With years of experience in commercial photography, we understand the importance of visual communication in today's digital landscape. From startup tech companies to established enterprises, we help brands tell their stories through stunning photography.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--orange-accent)' }}>500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--orange-accent)' }}>50+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--orange-accent)' }}>5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional team collaboration" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
