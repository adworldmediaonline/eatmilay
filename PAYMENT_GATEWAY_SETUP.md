# Payment Gateway Setup Guide - Razorpay Integration

This comprehensive guide will help you set up the complete payment gateway system with Razorpay, order management, and email notifications.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Razorpay Account Setup](#razorpay-account-setup)
3. [Environment Configuration](#environment-configuration)
4. [Email Service Setup](#email-service-setup)
5. [Database Configuration](#database-configuration)
6. [Testing the Integration](#testing-the-integration)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed
- ✅ Database (PostgreSQL/MySQL) set up
- ✅ Prisma configured and migrations run
- ✅ Next.js application running
- ✅ Valid business registration (for production)

---

## 💳 Razorpay Account Setup

### Step 1: Create Razorpay Account

1. **Visit Razorpay Dashboard**
   - Go to [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)
   - Sign up for a new account or log in

2. **Complete Account Verification**
   - Provide business details
   - Upload required documents (PAN, GST, Bank Account details)
   - Wait for account activation (usually 24-48 hours)

### Step 2: Get API Keys

1. **Navigate to Settings → API Keys**
   - Go to Settings → API Keys in the Razorpay Dashboard
   - Generate new API keys if not already created

2. **Copy Your Credentials**

   ```
   Test Mode:
   - Key ID: rzp_test_xxxxxxxxxx
   - Key Secret: xxxxxxxxxxxxxxxx

   Live Mode (after activation):
   - Key ID: rzp_live_xxxxxxxxxx
   - Key Secret: xxxxxxxxxxxxxxxx
   ```

### Step 3: Configure Webhooks (Optional but Recommended)

1. **Go to Settings → Webhooks**
2. **Add Webhook URL**: `https://yourdomain.com/api/webhooks/razorpay`
3. **Select Events**:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
4. **Save Webhook Secret** for verification

---

## ⚙️ Environment Configuration

### Step 1: Update Environment Variables

Create or update your `.env.local` file:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx

# Email Configuration (Choose one service)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Your Store Name

# Alternative: Resend (Recommended)
RESEND_API_KEY=re_xxxxxxxxxx
EMAIL_FROM=orders@yourdomain.com
EMAIL_FROM_NAME=Your Store Name

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GST_RATE=0.18
ORDER_NUMBER_PREFIX=ORD
```

### Step 2: Environment Variables Explanation

| Variable                      | Description                                 | Required |
| ----------------------------- | ------------------------------------------- | -------- |
| `RAZORPAY_KEY_ID`             | Your Razorpay Key ID (server-side)          | ✅ Yes   |
| `RAZORPAY_KEY_SECRET`         | Your Razorpay Key Secret (server-side only) | ✅ Yes   |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Key ID for client-side               | ✅ Yes   |
| `EMAIL_FROM`                  | Sender email address                        | ✅ Yes   |
| `EMAIL_FROM_NAME`             | Sender name                                 | ✅ Yes   |
| `RESEND_API_KEY`              | Resend API key (if using Resend)            | Optional |
| `NEXT_PUBLIC_APP_URL`         | Your app's URL                              | ✅ Yes   |
| `NEXT_PUBLIC_GST_RATE`        | Tax rate (0.18 = 18%)                       | Optional |

---

## 📧 Email Service Setup

### Option 1: Gmail SMTP (Simple Setup)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings → Security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"
3. **Use Generated Password** in `EMAIL_SERVER_PASSWORD`

### Option 2: Resend (Recommended for Production)

1. **Sign up at [Resend](https://resend.com/)**
2. **Verify your domain**:
   - Add your domain in Resend dashboard
   - Add DNS records as instructed
3. **Get API Key** from dashboard
4. **Update environment variables**:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxx
   EMAIL_FROM=orders@yourdomain.com
   ```

### Option 3: Other SMTP Services

**SendGrid:**

```bash
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your_sendgrid_api_key
```

**Mailgun:**

```bash
EMAIL_SERVER_HOST=smtp.mailgun.org
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=postmaster@your-domain.com
EMAIL_SERVER_PASSWORD=your_mailgun_password
```

---

## 🗄️ Database Configuration

### Step 1: Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (if using migrate)
npx prisma migrate deploy
```

### Step 2: Verify Database Schema

Ensure these tables exist:

- ✅ `Product`
- ✅ `Category`
- ✅ `Order`
- ✅ `OrderItem`
- ✅ `User` (if using authentication)

### Step 3: Seed Test Data (Optional)

```bash
# Create seed file if it doesn't exist
npx prisma db seed
```

---

## 🧪 Testing the Integration

### Step 1: Test Environment Setup

1. **Start Development Server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Verify Environment Variables**
   - Check that all required variables are loaded
   - Test API endpoints return proper responses

### Step 2: Test Order Creation

1. **Add Products to Cart**
   - Navigate to your store
   - Add products to cart
   - Verify cart functionality

2. **Go Through Checkout Process**
   - Fill in customer details
   - Select payment method
   - Proceed to payment

### Step 3: Test Payment Flow

1. **Use Razorpay Test Cards**

   **Successful Payment:**

   ```
   Card Number: 4111 1111 1111 1111
   Expiry: Any future date
   CVV: Any 3 digits
   ```

   **Failed Payment:**

   ```
   Card Number: 4000 0000 0000 0002
   Expiry: Any future date
   CVV: Any 3 digits
   ```

2. **Test UPI (Test Mode)**
   - Use any UPI ID ending with `@payu`
   - Example: `test@payu`

3. **Test Net Banking**
   - Select any test bank
   - Choose success/failure from test interface

### Step 4: Verify Order Management

1. **Check Order Creation**
   - Verify order appears in `/dashboard/orders`
   - Check order status updates correctly

2. **Test Email Notifications**
   - Confirm order confirmation emails are sent
   - Verify email templates render correctly

3. **Test Order Status Updates**
   - Update order status from dashboard
   - Verify status changes reflect properly

---

## 🚀 Production Deployment

### Step 1: Switch to Live Mode

1. **Update Environment Variables**

   ```bash
   # Replace test keys with live keys
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
   RAZORPAY_KEY_SECRET=live_secret_key_here
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
   ```

2. **Update App URL**
   ```bash
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

### Step 2: Configure Domain

1. **Set up SSL Certificate**
   - Ensure HTTPS is enabled
   - Razorpay requires secure connections

2. **Update Webhook URLs**
   - Change webhook URL to production domain
   - Test webhook delivery

### Step 3: Security Checklist

- ✅ Never expose `RAZORPAY_KEY_SECRET` in client-side code
- ✅ Validate all payment signatures server-side
- ✅ Use HTTPS for all payment-related pages
- ✅ Implement rate limiting on payment endpoints
- ✅ Log all payment transactions for audit

### Step 4: Compliance & Legal

1. **Privacy Policy**
   - Update privacy policy to mention payment data handling
   - Include Razorpay's data processing information

2. **Terms of Service**
   - Add payment terms and refund policy
   - Include dispute resolution process

3. **GST Configuration**
   - Ensure correct GST rates are applied
   - Configure GST number in Razorpay dashboard

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Payment Gateway Not Loading

**Problem:** Razorpay checkout doesn't appear

**Solutions:**

```bash
# Check if Razorpay script is loaded
console.log(window.Razorpay);

# Verify environment variables
echo $NEXT_PUBLIC_RAZORPAY_KEY_ID

# Check network requests in browser dev tools
```

#### 2. Payment Signature Verification Failed

**Problem:** Payment verification fails after successful payment

**Solutions:**

- Verify `RAZORPAY_KEY_SECRET` is correct
- Check signature generation logic
- Ensure order ID matches between creation and verification

#### 3. Email Notifications Not Sending

**Problem:** Order confirmation emails not delivered

**Solutions:**

```bash
# Test SMTP connection
telnet smtp.gmail.com 587

# Check email service logs
# Verify sender email is authorized

# Test with different email provider
```

#### 4. Database Connection Issues

**Problem:** Orders not saving to database

**Solutions:**

```bash
# Test database connection
npx prisma db pull

# Check database URL format
# Verify database permissions

# Run migrations
npx prisma migrate deploy
```

#### 5. CORS Errors in Production

**Problem:** Payment requests blocked by CORS

**Solutions:**

```javascript
// Add to next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://checkout.razorpay.com',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        ],
      },
    ];
  },
};
```

### Debug Commands

```bash
# Check environment variables
env | grep RAZORPAY

# Test API endpoints
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check database connectivity
npx prisma studio

# View application logs
npm run dev -- --verbose

# Test email service
node -e "console.log(process.env.EMAIL_FROM)"
```

---

## 📞 Support & Resources

### Official Documentation

- [Razorpay Integration Guide](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

### Helpful Links

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Resend Documentation](https://resend.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Contact Support

- **Razorpay Support**: [support@razorpay.com](mailto:support@razorpay.com)
- **Integration Issues**: Check GitHub issues or create new one

---

## ✅ Final Checklist

Before going live, ensure:

- [ ] Razorpay account is activated and verified
- [ ] Live API keys are configured
- [ ] SSL certificate is installed and working
- [ ] Email service is configured and tested
- [ ] Database is backed up and secure
- [ ] All payment flows tested thoroughly
- [ ] Webhook endpoints are secure and tested
- [ ] Error handling is implemented
- [ ] Logging and monitoring are set up
- [ ] Privacy policy and terms are updated
- [ ] GST configuration is correct
- [ ] Refund process is documented

---

**🎉 Congratulations!** Your payment gateway is now fully configured and ready for production use.

For any issues or questions, refer to the troubleshooting section or contact the respective service providers.
