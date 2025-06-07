import React from 'react';
import { Card, CardContent, CardHeader, CardTitle  } from './Card';

interface Feature {
  title: string;
  description: string;
}


const features: Feature[] = [
  {
    title: "100%",
    description: "Voice, text & image-based trading for seamless accessibility.",
  },
  {
    title: "34%",
    description: "Tech-challenged crypto enthusiasts now able to access DeFi.",
  },
  {
    title: "1B+",
    description: "People with disabilities who can now trade using voice commands.",
  },
];


export const Features: React.FC = () => {
    return (
     <section id="howItWorks" className="container text-center py-10 sm:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
        <span className="text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text">
          Built for Security, Designed for Trust{" "}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }) => (
          <Card key={title} className="bg-[#1E293B80]">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center text-5xl text-transparent bg-[#008080] bg-[#ff9500] bg-clip-text">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
    );
}