import React, { useEffect, useState } from 'react';
import Sidebar from '../../componentsAdmin/Sidebar';
import { MdCameraAlt } from 'react-icons/md';
import Image from 'next/image';
import { storage } from '../../firebase.js';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import axios from 'axios';

interface Values {
  name: string;
  price: number | string;
  slogan: string;
  desc: string;
}

interface Status {
  success: boolean;
  msg: string;
}

const PostFood = () => {
  const [status, setStatus] = useState<Status>({ success: false, msg: '' });
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean>(false);
  const [values, setValues] = useState<Values>({
    name: '',
    price: '',
    slogan: '',
    desc: '',
  });

  useEffect(() => {
    setResponse(true);
    const timeID = setTimeout(() => setResponse(false), 3000);
    return () => clearTimeout(timeID);
  }, [status]);

  const previewImage = (e: React.ChangeEvent<any>) => {
    const reader = new FileReader();
    if (!e.target.files[0]) {
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => setImage(readerEvent.target?.result);
  };

  const handlePublish = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let img: string = '';
      const imageRef = ref(storage, values.name);
      await uploadString(imageRef, image, 'data_url').then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        img = downloadURL;
      });
      const slug = values.name.split(' ').join('-').toLowerCase();
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/foods`, {
        img,
        ...values,
        slug,
      });
      setLoading(false);
      setValues({ name: '', price: '', slogan: '', desc: '' });
      setImage(null);
      setStatus({ success: true, msg: 'Puslished' });
    } catch (error: any) {
      const er = error?.response?.data?.error;
      if (er?.code === 11000 && er?.keyPattern.name === 1) {
        setStatus({ success: false, msg: 'Name is already in use' });
      }
      if (er?.code === 11000 && er?.keyPattern.img === 1) {
        setStatus({ success: false, msg: 'Image is already in use' });
      }

      setLoading(false);
    }
  };
  return (
    <main className="relative w-full grid grid-cols-12 h-screen">
      <Sidebar />
      <section className="mt-16 w-full col-span-10 p-8 bg-yellow-500 flex justify-center items-center">
        <form
          onSubmit={handlePublish}
          className="w-full bg-red-500 h-full rounded-md grid grid-cols-2 place-items-center"
        >
          <div className="flex flex-col gap-10">
            <input
              required
              type="text"
              placeholder="Name"
              value={values.name}
              className="h-[2.5rem] w-[20rem] pl-2 rounded-md border-2 border-yellow-500 text-black"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Slogan"
              value={values.slogan}
              className="h-[2.5rem] w-[20rem] pl-2 rounded-md border-2 border-yellow-500 text-black"
              onChange={(e) => setValues({ ...values, slogan: e.target.value })}
            />
            <input
              required
              type="text"
              value={values.desc}
              placeholder="Short Description"
              className="h-[2.5rem] w-[20rem] pl-2 rounded-md border-2 border-yellow-500 text-black"
              onChange={(e) => setValues({ ...values, desc: e.target.value })}
            />
            <input
              required
              type="number"
              value={values.price}
              placeholder="Price"
              className="h-[2.5rem] w-[20rem] pl-2 rounded-md border-2 border-yellow-500 text-black"
              onChange={(e) =>
                setValues({ ...values, price: Number(e.target.value) })
              }
            />
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="relative w-[20rem] h-[20rem] mx-auto rounded-md bg-yellow-500">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="w-[20rem] h-[20rem] relative">
                  {!image ? (
                    <MdCameraAlt className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-3xl" />
                  ) : (
                    <Image
                      src={image}
                      layout="fill"
                      alt=""
                      objectFit="contain"
                      className="rounded-md"
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                name="imageUpload"
                id="imageUpload"
                className="hidden"
                onChange={previewImage}
                required
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="pt-1 pb-[0.3rem] w-max mx-auto px-5 border-2 border-yellow-500 text-yellow-500 duration-200 ease-out transition-all hover:bg-yellow-500 hover:bg-opacity-20 rounded-md"
            >
              {status.success && response
                ? 'Published'
                : loading
                ? 'Publishing'
                : 'Publish'}
            </button>
            {response && !status.success && (
              <p
                className={`text-center py-1 px-4 bg-white font-semibold w-max mx-auto border-2 rounded-md ${
                  status.success ? 'text-green-500' : 'text-red-400'
                } `}
              >
                {status.msg}
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default PostFood;
