"use client";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from '../ui/button';

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
    cell: ({ row }) => {
      const handleButtonClick = async () => {
        const images = row.original.images;

        if (!images || images.length === 0) {
          alert("No images available to download.");
          return;
        }
        console.log(row)
        const zip = new JSZip();
        const folder = zip.folder("images");

        if (!folder) {
          alert("Failed to create zip folder.");
          return;
        }
        const getFileType = (url: string) => {
          const parts = url.split('.');
          return parts[parts.length - 1];
        };
        for (let index = 0; index < images.length; index++) {
          const imageUrl = images[index];
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          folder.file(`image${index + 1}.${getFileType(imageUrl)}`, blob);
        }

        zip.generateAsync({ type: "blob" }).then((content: any) => {
          saveAs(content, "images.zip");
        });
      };

      return (
        <Button title='Download Images' className='hover:bg-neutral-200' onClick={handleButtonClick}>
          Download Images
        </Button>
      );
    }

  },
];
