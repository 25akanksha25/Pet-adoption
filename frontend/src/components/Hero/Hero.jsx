// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import "./Hero.css";

// const Hero = () => {
//   return (
//     <section className="hero">
//       <div className="hero-container">
//         {/* Left Content */}
//         <motion.div 
//           className="hero-content"
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 1.2 }}
//           >
//             Find Your
//             <br />
//             Purr-fect
//             <br />
//             <motion.span 
//               className="highlight"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 1.2 }}
//             >
//               Furry Companion
//             </motion.span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.2, duration: 1.2 }}
//           >
//             Every pet deserves a loving home. Join us in making a difference 
//             by adopting or rehoming a pet. Your new best friend is waiting!
//           </motion.p>
//           <motion.div 
//             className="buttons"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.6, duration: 1.2 }}
//           >
//             <Link to="/adopt">
//               <motion.button 
//                 className="btn-primary"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Adopt a Pet
//               </motion.button>
//             </Link>
//             <Link to="/rehome">
//               <motion.button 
//                 className="btn-secondary"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Rehome a Pet
//               </motion.button>
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Right Content (Image) */}
//         {/* Right Content (Image) */}
// <motion.div 
//   className="hero-image"
//   initial={{ opacity: 0, x: 100 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 1.2 }}
// >
//   <motion.div 
//     className="hero-image-container"
//     animate={{ y: [0, -10, 0] }}
//     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//   >
//     <img
//       src="/assets/herobg.gif"
//       alt="Cat and Dog"
//       className="hero-main-image"
//     />
//   </motion.div>

//   {/* Floating Info Boxes */}
//   <div className="floating-box top">
//     <h4>✨ Healthy & Vaccinated</h4>
//     <p>Our pets are fully checked and vaccinated to ensure they are ready for a loving home.</p>
//   </div>

//   <div className="floating-box bottom">
//     <h4>🏡 Trusted Adoptions</h4>
//     <p>Join our community of happy pet parents who found their perfect match.</p>
//   </div>
// </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Hero;

// // import React from "react";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import '../../styles/globals.css';


// // const Hero = () => {
// //   return (
// //     <section className="bg-white min-h-[90vh] overflow-hidden">
// //       <div className="max-w-[1200px] mx-auto px-4 pt-32 flex flex-col lg:flex-row items-center justify-between gap-4">
// //         {/* Left Content */}
// //         <motion.div
// //           className="flex-1 max-w-xl"
// //           initial={{ opacity: 0, x: -100 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1.2 }}
// //         >
// //           <motion.h1
// //             className="text-[3.5rem] font-extrabold leading-[1.2] mb-6 text-gray-800 font-['Montserrat']"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4, duration: 1.2 }}
// //           >
// //             Find Your
// //             <br />
// //             Purr-fect
// //             <br />
// //             <motion.span
// //               className="block text-[#6c63ff] text-[3.8rem]"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.8, duration: 1.2 }}
// //             >
// //               Furry Companion
// //             </motion.span>
// //           </motion.h1>

// //           <motion.p
// //             className="text-[1.2rem] leading-relaxed text-gray-600 mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 1.2, duration: 1.2 }}
// //           >
// //             Every pet deserves a loving home. Join us in making a difference
// //             by adopting or rehoming a pet. Your new best friend is waiting!
// //           </motion.p>

// //           <motion.div
// //             className="flex gap-4 mb-12 flex-wrap md:flex-nowrap"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 1.6, duration: 1.2 }}
// //           >
// //             <Link to="/adopt">
// //               <motion.button
// //                 className="bg-primary text-text-light px-6 py-3 text-lg font-semibold rounded-lg transition-all hover:bg-primary-light hover:-translate-y-1 shadow-md"
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 Adopt a Pet
// //               </motion.button>
// //             </Link>
// //             <Link to="/rehome">
// //               <motion.button
// //                 className="bg-transparent text-white border-2 border-[#6c63ff] px-6 py-3 text-lg font-semibold rounded-lg transition-all hover:bg-[#6c63ff1a] hover:-translate-y-1"
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 Rehome a Pet
// //               </motion.button>
// //             </Link>
// //           </motion.div>
// //         </motion.div>

// //         {/* Right Content */}
// //         <motion.div
// //           className="flex-1 max-w-lg relative"
// //           initial={{ opacity: 0, x: 100 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1.2 }}
// //         >
// //           <motion.div
// //             className="relative z-10"
// //             animate={{ y: [0, -10, 0] }}
// //             transition={{
// //               duration: 4,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //             }}
// //           >
// //             <img
// //               src="/assets/dogsandcats.jpg"
// //               alt="Cat and Dog"
// //               className="w-full h-auto rounded-[20px] ml-8 lg:ml-8"
// //             />
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Hero;


// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import "./Hero.css";

// const Hero = () => {
//   return (
//     <section className="hero">
//       {/* Full Background Image */}
//       <motion.div 
//         className="hero-background"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//       >
//         <motion.div 
//           className="hero-image-container"
//           animate={{ y: [0, -10, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <img
//             src="/assets/herobg.gif"
//             alt="Cat and Dog"
//             className="hero-main-image"
//           />
//         </motion.div>

//         {/* Floating Info Boxes */}
//         <div className="floating-box top">
//           <h4>✨ Healthy & Vaccinated</h4>
//           <p>Our pets are fully checked and vaccinated to ensure they are ready for a loving home.</p>
//         </div>

//         <div className="floating-box bottom">
//           <h4>🏡 Trusted Adoptions</h4>
//           <p>Join our community of happy pet parents who found their perfect match.</p>
//         </div>
//       </motion.div>

//       {/* Content Overlay */}
//       <motion.div 
//         className="hero-content-overlay"
//         initial={{ opacity: 0, x: -100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1.2 }}
//       >
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 1.2 }}
//         >
//           Find Your
//           <br />
//           Purr-fect
//           <br />
//           <motion.span 
//             className="highlight"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 1.2 }}
//           >
//             Furry Companion
//           </motion.span>
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 1.2 }}
//         >
//           Every pet deserves a loving home. Join us in making a difference 
//           by adopting or rehoming a pet. Your new best friend is waiting!
//         </motion.p>
//         <motion.div 
//           className="buttons"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.6, duration: 1.2 }}
//         >
//           <Link to="/adopt">
//             <motion.button 
//               className="btn-primary"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Adopt a Pet
//             </motion.button>
//           </Link>
//           <Link to="/rehome">
//             <motion.button 
//               className="btn-secondary"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Rehome a Pet
//             </motion.button>
//           </Link>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Full Background Image */}
      <motion.div 
        className="hero-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div 
          className="hero-image-container"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/assets/herobg.gif"
            alt="Cat and Dog"
            className="hero-main-image"
          />
        </motion.div>

        {/* Bottom Right Floating Boxes */}
        {/* <div className="floating-box-wrapper">
          <div className="floating-box">
            <strong><h4>✨ Vaccinated</h4></strong>
            <p>All pets are vet-checked.</p>
          </div>

          <div className="floating-box">
          <strong><h4>🏡 Trusted Adoptions</h4></strong>
            <p>Find your perfect match.</p>
          </div>
        </div> */}

      </motion.div>

      {/* Content Overlay */}
      <motion.div 
        className="hero-content-overlay"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          Find Your
          Purr-fect
          <br />
          <motion.span 
            className="highlight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            Furry Companion
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          Every pet deserves a loving home. Join us in making a difference 
          by adopting or rehoming a pet. Your new best friend is waiting!
        </motion.p>
        <motion.div 
          className="buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.2 }}
        >
          <Link to="/adopt">
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Adopt a Pet
            </motion.button>
          </Link>
          <Link to="/rehome">
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rehome a Pet
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
