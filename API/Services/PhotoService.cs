
using CloudinaryDotNet;
using API.Helpers;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings>){
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }
        
        public async Task<ImageUploadResults> addPhotoAsync(IFormFile file) {

            var uploadResult = new ImageUploadResults();

            if(file.length>0){
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams 
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                    .Gravity("face");
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            
            return uploadResult;
        }
        public async Task<DeletionResult> deletePhotoAsync(string publicId){
            var deleteParams =  new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}