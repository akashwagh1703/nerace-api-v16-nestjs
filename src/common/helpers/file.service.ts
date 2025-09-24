import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  private readonly uploadPath = './uploads';
  private readonly allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  private readonly allowedDocTypes = ['.pdf', '.doc', '.docx', '.txt'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor() {
    this.ensureUploadDirectories();
  }

  private ensureUploadDirectories() {
    const directories = [
      'uploads/profiles',
      'uploads/documents',
      'uploads/products',
      'uploads/farms',
      'uploads/temp'
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  generateFileName(originalName: string): string {
    const ext = extname(originalName);
    const name = uuidv4();
    return `${name}${ext}`;
  }

  validateFile(file: Express.Multer.File, type: 'image' | 'document' = 'image'): boolean {
    if (!file) return false;

    // Check file size
    if (file.size > this.maxFileSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Check file type
    const ext = extname(file.originalname).toLowerCase();
    const allowedTypes = type === 'image' ? this.allowedImageTypes : this.allowedDocTypes;
    
    if (!allowedTypes.includes(ext)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    return true;
  }

  async saveFile(file: Express.Multer.File, directory: string): Promise<string> {
    this.validateFile(file);
    
    const fileName = this.generateFileName(file.originalname);
    const filePath = path.join(this.uploadPath, directory, fileName);
    
    await fs.promises.writeFile(filePath, file.buffer);
    
    return `${directory}/${fileName}`;
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.uploadPath, filePath);
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('File deletion failed:', error);
      return false;
    }
  }

  getFileUrl(filePath: string): string {
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${filePath}`;
  }

  async moveFile(sourcePath: string, destinationPath: string): Promise<boolean> {
    try {
      const sourceFullPath = path.join(this.uploadPath, sourcePath);
      const destFullPath = path.join(this.uploadPath, destinationPath);
      
      await fs.promises.rename(sourceFullPath, destFullPath);
      return true;
    } catch (error) {
      console.error('File move failed:', error);
      return false;
    }
  }

  getFileInfo(filePath: string): any {
    try {
      const fullPath = path.join(this.uploadPath, filePath);
      const stats = fs.statSync(fullPath);
      
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        exists: true
      };
    } catch (error) {
      return { exists: false };
    }
  }
}
