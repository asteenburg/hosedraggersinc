"use client";

export default function Mission() {
  return (
    <section className='flex flex-col md:flex-row py-20 bg-gray-50 mt-20 md:mx-8 mx-auto rounded-[2rem]'>
      <div className='max-w-3xl mx-auto text-center mb-16 px-6'>
        <h3 className='text-orange-600 font-black uppercase tracking-widest text-sm mb-4'>
          Our Story
        </h3>
        <p className='text-2xl md:text-3xl font-bold text-gray-900 leading-tight'>
          Built for the job.{" "}
          <span className='text-orange-600'>Inspired by family.</span>
        </p>
        <p className='mt-6 text-gray-600 text-lg leading-relaxed'>
          Founded by a career firefighter and father, Hose Draggers Inc. bridges
          the gap between the firehouse and the home. We create premium,
          weather-resistant vinyl art that stands up to the heat—because whether
          you're five years old or a twenty-year veteran, everyone loves a
          badass sticker.
        </p>
      </div>
    </section>
  );
}
