"use client";
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; // You'll also need to install this: npm install file-saver


import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={`/products/${row.original.product._id}`}
          className="hover:text-red-1"
        >
          {row.original.product.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => 
    //   {
    //   return <div>{row.original.images?.map(image => {
    //     return <p>{image}</p>
    //   })}</div>
    // }

    {
      const handleButtonClick = async () => {
        const images = row.original.images;

        if (!images || images.length === 0) {
          alert("No images available to download.");
          return;
        }

        const zip = new JSZip();
        const folder = zip.folder("images");

        if (!folder) {
          alert("Failed to create zip folder.");
          return;
        }

        // Add each image to the zip folder using a traditional for loop
        for (let index = 0; index < images.length; index++) {
          const imageUrl = images[index];
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          folder.file(`image${index + 1}.jpg`, blob); // You can change the file name and extension as needed
        }

        // Generate the zip file and trigger the download
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "images.zip");
        });
      };

      // Directly return the JSX without the `return` keyword
      return (
        <button onClick={handleButtonClick}>
          Download Images
        </button>
      );
    }

  },
];
