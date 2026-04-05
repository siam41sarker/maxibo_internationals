import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductShowcase = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  const { productCategories, heroProducts } = data;

  const sectionColors = ["bg-white", "bg-gray-50"];

  const getHeroImage = (id) => {
    const idMap = {
      cad: "plotter",
    };

    const finalId = idMap[id] || id;
    const found = heroProducts.find((item) => item.id === finalId);

    return found?.image;
  };

  return (
    <div>
      {productCategories.map((product, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <section
            key={product.id}
            className={`${sectionColors[index % sectionColors.length]} py-16`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* IMAGE / SLIDER */}
                <div className={`${isReverse ? "md:order-2" : ""} min-w-0`}>
                  {product.sliderImages ? (
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      style={{
                        "--swiper-navigation-color": "#2B9EC0",
                        "--swiper-pagination-color": "#2B9EC0",
                      }}
                      className="w-full rounded-2xl overflow-hidden shadow-md"
                    >
                      {product.sliderImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img
                            src={img}
                            alt={product.name}
                            className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[360px] object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src={getHeroImage(product.id)}
                      alt={product.name}
                      className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[360px] object-cover rounded-2xl shadow-md"
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className={isReverse ? "md:order-1" : ""}>
                  <h2 className="font-outfit text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
                    {product.name}
                  </h2>

                  <p className="font-inter text-gray-500 mb-6">
                    {product.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6 font-inter text-sm">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="text-orange-500 mt-[2px]"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <p className="font-inter text-sm text-gray-500 mb-5">
                    Partners:{" "}
                    <span className="text-orange-500">
                      {product.partners.join(", ")}
                    </span>
                  </p>

                  <NavLink to="/contact">
                    <button className="font-inter bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
                      Request a Quote →
                    </button>
                  </NavLink>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProductShowcase;