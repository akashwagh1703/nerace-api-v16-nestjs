# Nerace API - NestJS

A comprehensive agricultural trading platform API built with NestJS, converted from CodeIgniter 3.

## Features

- **User Management**: Registration, login, profile management with OTP verification
- **Trading System**: Buyer-seller marketplace for agricultural products
- **Commodity Management**: Market rates, price tracking, commodity information
- **Master Data**: States, districts, crops, soil types, irrigation types
- **File Management**: Image and document upload functionality
- **Authentication**: JWT-based authentication with role-based access
- **Multi-language Support**: English, Hindi, Marathi, Bengali, Assamese
- **Payment Integration**: Multiple payment gateway support
- **Real-time Features**: Chat, notifications, e-meetings

## Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer
- **SMS**: HTTP SMS Gateway

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application
npm run start:dev
```

## Environment Variables

```env
# Database
DB_HOST=172.16.25.5
DB_PORT=30130
DB_USERNAME=postgres
DB_PASSWORD=Supp0rt@123
DB_DATABASE=nerace

# JWT
JWT_SECRET=937ee2yklMgKxEMHsgzVKKVV2aoYJY2s

# SMS Configuration
SMS_LOGIN_ID=t1spochub
SMS_PASSWORD=EsdsSupp0rt@123
SMS_SENDER_ID=OTPSMS
SMS_URL=http://hindit.co.in/API/pushsms.aspx

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
SMTP_FROM=noreply@nerace.com

# Application
BASE_URL=http://localhost:3000
NODE_ENV=development
```

## API Documentation

Once the application is running, visit:
- API Documentation: http://localhost:3000/api/docs
- API Base URL: http://localhost:3000/api/v16

## Project Structure

```
src/
├── common/
│   ├── auth/           # Authentication guards and strategies
│   ├── database/       # Database configuration
│   ├── entities/       # Base entities
│   └── helpers/        # Common services and utilities
├── modules/
│   ├── users/          # User management
│   ├── buyer/          # Buyer functionality
│   ├── commodity/      # Commodity management
│   ├── farmer/         # Farmer-specific features
│   ├── master/         # Master data management
│   ├── chat/           # Chat functionality
│   ├── notification/   # Push notifications
│   ├── payment/        # Payment processing
│   └── ...             # Other modules
├── app.module.ts       # Main application module
└── main.ts            # Application entry point
```

## Key Endpoints

### Authentication
- `POST /api/v16/users/register` - User registration
- `POST /api/v16/users/login` - User login
- `POST /api/v16/users/verify-otp` - OTP verification
- `GET /api/v16/users/profile` - Get user profile

### Trading
- `GET /api/v16/buyer/trade-products` - Get trade products
- `POST /api/v16/buyer/show-interest/:productId` - Show interest
- `POST /api/v16/buyer/place-bid/:productId` - Place bid

### Master Data
- `GET /api/v16/master/states` - Get all states
- `GET /api/v16/master/districts` - Get districts
- `GET /api/v16/master/crops` - Get crops
- `GET /api/v16/master/all` - Get all master data

### Commodities
- `GET /api/v16/commodity/list` - Get commodity list
- `GET /api/v16/commodity/prices` - Get commodity prices
- `GET /api/v16/commodity/market-rates` - Get market rates

## Database Schema

The application uses PostgreSQL with the following key entities:
- Users (farmers, buyers, vendors)
- Trade Products
- Commodities and Prices
- Master Data (states, districts, crops)
- Bids and Interests
- Notifications
- Chat Messages

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- File upload validation

## Development

```bash
# Development mode
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint
```

## Migration from CodeIgniter 3

This NestJS application maintains API compatibility with the original CodeIgniter 3 version while providing:
- Better TypeScript support
- Modern architecture patterns
- Enhanced security features
- Improved performance
- Better testing capabilities
- Comprehensive documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for Nerace Agricultural Trading Platform.