import { useRef, useEffect } from 'react';

const UploadWidget = ({ onImageUrl, onImgPreview }) => {
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dwbrlfgkg',
        uploadPreset: 'reheazkq',
      },
      (error, result) => {
        if (result?.data?.info?.hasOwnProperty('files')) {
          const files = result?.data?.info?.files;

          const urls =
            files.length > 0
              ? files
                  ?.map((file) => {
                    return file?.uploadInfo?.url;
                  })
                  ?.join(', ')
              : '';

          const thumbs =
            files.length > 0
              ? files?.map((file) => {
                  return file?.uploadInfo?.thumbnail_url;
                })
              : [];

          onImageUrl(urls);
          onImgPreview(thumbs);
        }

        if (error) {
          alert('Gagal upload', error);
        }
      }
    );
  }, []);

  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
};

export default UploadWidget;
