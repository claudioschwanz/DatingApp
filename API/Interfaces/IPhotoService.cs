using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public class IPhotoService
    {
        public async Task<ImageUploadResults> addPhotoAsync(IFormFile file);
        public async Task<DeletionResult> deletePhotoAsync(string publicId);
    }
}