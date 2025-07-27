import { About } from '@/app/types/DevData';
import Image from 'next/image';
import { ContactForm } from '../common';

type AboutPageProps = {
  data: About;
  id: string;
};
const AboutPage = ({ data, id }: AboutPageProps) => {
  const { name, title, highlights, socialLinks, mobile } = data;
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center  mt-10">
        About
      </h2>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mt-4">
        <section id={id} className="order-2 sm:order-1 py-10 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold  mb-2">
              {name}
            </h2>

            <p className=" text-base sm:text-lg md:text-xl font-medium mb-2">{title}</p>

            <p className=" text-sm sm:text-base mb-2 px-2 sm:px-6">{highlights}</p>

            <p className=" text-sm sm:text-base mb-2 px-2 sm:px-6">{mobile}</p>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src={link.icon}
                    alt={`${link.platform} icon`}
                    width={24}
                    height={24}
                    className="invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
        <div className='order-1 sm:order-2'>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export { AboutPage };
