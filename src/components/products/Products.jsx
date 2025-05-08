import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
   const url = import.meta.env.VITE_BASE_URL;
   const [data, setData] = useState(null);
   const [list, setList] = useState(null);
   const [count, setCount] = useState(1);

   useEffect(() => {});

   useEffect(() => {
      axios
         .get(`${url}/recipes/tags`)
         .then((res) => {
            setList(res.data);
         })
         .catch((err) => {
            console.log(err);
         });

      axios
         .get(`${url}/recipes`, {
            params: {
               limit: 8,
               page: 0,
            },
         })
         .then((res) => {
            setData(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const handleSeemore = (e) => {
      let len = data.recipes?.length;
      if (len == data.total) {
         e.target.style = "display:none";
         return;
      }

      setCount(count + 1);

      axios
         .get(`${url}/recipes`, {
            params: {
               limit: 8 * (count + 1),
               page: 0,
            },
         })
         .then((res) => {
            console.log(res.data);
            setData({ ...data, ...res.data });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleTag = (e) => {
      let tag = e.target.innerHTML;
      axios
         .get(`${url}/recipes/tag/${tag}`)
         .then((res) => {
            setData(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <h2 className="text-center text-3xl">Recipes</h2>

         <ul className="container mx-auto flex gap-1.5 overflow-auto text-nowrap no-scrollbar py-2.5 mb-8">
            {list?.map((l, i) => (
               <li onClick={handleTag} key={i} className="cursor-pointer p-0.5 bg-gray-500 text-amber-50 rounded-[4px]">
                  {l}
               </li>
            ))}
         </ul>

         <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
            {data?.recipes?.map((recipes) => (
               <div className="shadow-gray-700 shadow-md " key={recipes.id}>
                  <div>
                     <img className="w-full h-[250px] object-contain" src={recipes.image} loading="lazy" alt={recipes.name} />
                  </div>
                  <div className="p-3">
                     <h3 title={recipes.id} className="text-lg font-bold line-clamp-1 text-center">
                        {recipes.name}
                     </h3>
                     <strong>Tags </strong>
                     {recipes.tags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         <div className="container mx-auto my-[40px] py-2.5 grid place-items-center">
            <button onClick={handleSeemore} className="border py-2.5 px-5 w-[200px] rounded-[4px] bg-green-600 text-amber-50 cursor-pointer">
               See more
            </button>
         </div>
      </div>
   );
};

export default Products;
