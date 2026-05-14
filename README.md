# tcias.co.uk — Greg Stewart

Personal site for Greg Stewart / Teacup In A Storm Ltd.
A single-page HTML/CSS/JS site — no build step required.

## Stack

- Pure HTML, CSS, JavaScript — zero dependencies, zero build tooling
- Fonts loaded from Google Fonts (Libre Baskerville + DM Sans)
- Deployed to AWS S3 via GitHub Actions

## Local development

Open `index.html` directly in a browser. No server needed.

For a local dev server (optional):

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deployment

The site deploys automatically to S3 on every push to `main`.

### GitHub Actions secrets required

Set these in your repository settings under **Settings → Secrets and variables → Actions**:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user with S3 write access |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret key |
| `AWS_DEFAULT_REGION` | e.g. `eu-west-1` |
| `S3_BUCKET_NAME` | Your S3 bucket name (e.g. `www.tcias.co.uk`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional — only if using CloudFront CDN |

### S3 bucket setup

The bucket should be configured for static website hosting:
- Enable "Static website hosting" in bucket properties
- Set index document: `index.html`
- Set error document: `index.html`
- Bucket policy should allow public read (or use CloudFront OAC for private bucket)

### IAM permissions needed

The deploying IAM user needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::YOUR_BUCKET_NAME", "arn:aws:s3:::YOUR_BUCKET_NAME/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    }
  ]
}
```

## File structure

```
tcias.co.uk/
├── index.html          # The entire site
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── README.md
```

## Updating content

All content lives in `index.html`. The site is intentionally dependency-free
so updates are a simple edit + git push.
