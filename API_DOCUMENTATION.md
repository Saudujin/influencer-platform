# API Documentation

Complete API reference for the Influencer Management Platform.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. This should be added for production use.

## Endpoints

### Influencers

#### Get All Influencers

```http
GET /api/influencers
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name or username |
| categoryIds | number[] | Filter by category IDs |
| regionIds | number[] | Filter by region IDs |
| gender | string | Filter by gender (Male/Female) |
| platforms | string[] | Filter by platforms |
| minRate | number | Minimum advertising rate |
| maxRate | number | Maximum advertising rate |
| minFollowers | number | Minimum followers count |
| maxFollowers | number | Maximum followers count |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |
| sortBy | string | Sort field (name, createdAt, advertisingRate, followersCount) |
| sortOrder | string | Sort order (asc, desc) |

**Response:**

```json
{
  "influencers": [
    {
      "id": 1,
      "name": "Ahmed Al-Saud",
      "username": "@ahmed_saud",
      "platforms": ["Instagram", "TikTok"],
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Lifestyle"
      },
      "gender": "Male",
      "phoneNumber": "+966501234567",
      "advertisingRate": 1500.00,
      "followersCount": 50000,
      "regionId": 1,
      "region": {
        "id": 1,
        "name": "Riyadh"
      },
      "notes": "Top lifestyle influencer",
      "createdAt": "2025-10-02T10:00:00.000Z",
      "updatedAt": "2025-10-02T10:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 5
}
```

#### Get Single Influencer

```http
GET /api/influencers/:id
```

**Response:**

```json
{
  "id": 1,
  "name": "Ahmed Al-Saud",
  "username": "@ahmed_saud",
  "platforms": ["Instagram", "TikTok"],
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Lifestyle"
  },
  "gender": "Male",
  "phoneNumber": "+966501234567",
  "advertisingRate": 1500.00,
  "followersCount": 50000,
  "regionId": 1,
  "region": {
    "id": 1,
    "name": "Riyadh"
  },
  "notes": "Top lifestyle influencer",
  "createdAt": "2025-10-02T10:00:00.000Z",
  "updatedAt": "2025-10-02T10:00:00.000Z"
}
```

#### Create Influencer

```http
POST /api/influencers
```

**Request Body:**

```json
{
  "name": "Ahmed Al-Saud",
  "username": "@ahmed_saud",
  "platforms": ["Instagram", "TikTok"],
  "categoryId": 1,
  "gender": "Male",
  "phoneNumber": "+966501234567",
  "advertisingRate": 1500,
  "followersCount": 50000,
  "regionId": 1,
  "notes": "Top lifestyle influencer"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Ahmed Al-Saud",
  "username": "@ahmed_saud",
  ...
}
```

#### Update Influencer

```http
PUT /api/influencers/:id
```

**Request Body:**

```json
{
  "name": "Ahmed Al-Saud Updated",
  "advertisingRate": 2000
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Ahmed Al-Saud Updated",
  "advertisingRate": 2000,
  ...
}
```

#### Delete Influencer

```http
DELETE /api/influencers/:id
```

**Response:**

```json
{
  "message": "Influencer deleted successfully"
}
```

#### Bulk Update Influencers

```http
POST /api/influencers/bulk
```

**Request Body:**

```json
{
  "ids": [1, 2, 3],
  "data": {
    "categoryId": 2,
    "regionId": 5
  }
}
```

**Response:**

```json
{
  "message": "Updated 3 influencers successfully",
  "count": 3
}
```

### Categories

#### Get All Categories

```http
GET /api/categories
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Beauty",
    "createdAt": "2025-10-02T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Fashion",
    "createdAt": "2025-10-02T10:00:00.000Z"
  }
]
```

#### Create Category

```http
POST /api/categories
```

**Request Body:**

```json
{
  "name": "New Category"
}
```

**Response:**

```json
{
  "id": 13,
  "name": "New Category",
  "createdAt": "2025-10-02T10:00:00.000Z"
}
```

### Regions

#### Get All Regions

```http
GET /api/regions
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Riyadh",
    "createdAt": "2025-10-02T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jeddah",
    "createdAt": "2025-10-02T10:00:00.000Z"
  }
]
```

#### Create Region

```http
POST /api/regions
```

**Request Body:**

```json
{
  "name": "New Region"
}
```

**Response:**

```json
{
  "id": 21,
  "name": "New Region",
  "createdAt": "2025-10-02T10:00:00.000Z"
}
```

### Campaigns

#### Get All Campaigns

```http
GET /api/campaigns
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Summer Campaign 2025",
    "description": "Summer influencer campaign",
    "selectedFields": ["name", "username", "platforms", "followersCount"],
    "influencerCount": 5,
    "createdAt": "2025-10-02T10:00:00.000Z",
    "updatedAt": "2025-10-02T10:00:00.000Z"
  }
]
```

#### Get Single Campaign

```http
GET /api/campaigns/:id
```

**Response:**

```json
{
  "id": 1,
  "title": "Summer Campaign 2025",
  "description": "Summer influencer campaign",
  "selectedFields": ["name", "username", "platforms", "followersCount"],
  "campaignInfluencers": [
    {
      "influencer": {
        "id": 1,
        "name": "Ahmed Al-Saud",
        "username": "@ahmed_saud",
        ...
      }
    }
  ],
  "createdAt": "2025-10-02T10:00:00.000Z",
  "updatedAt": "2025-10-02T10:00:00.000Z"
}
```

#### Create Campaign

```http
POST /api/campaigns
```

**Request Body:**

```json
{
  "title": "Summer Campaign 2025",
  "description": "Summer influencer campaign",
  "selectedFields": ["name", "username", "platforms", "followersCount"],
  "influencerIds": [1, 2, 3, 4, 5]
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Summer Campaign 2025",
  "description": "Summer influencer campaign",
  "selectedFields": ["name", "username", "platforms", "followersCount"],
  "createdAt": "2025-10-02T10:00:00.000Z",
  "updatedAt": "2025-10-02T10:00:00.000Z"
}
```

#### Update Campaign

```http
PUT /api/campaigns/:id
```

**Request Body:**

```json
{
  "title": "Updated Campaign Title",
  "description": "Updated description"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Updated Campaign Title",
  "description": "Updated description",
  ...
}
```

#### Delete Campaign

```http
DELETE /api/campaigns/:id
```

**Response:**

```json
{
  "message": "Campaign deleted successfully"
}
```

#### Duplicate Campaign

```http
POST /api/campaigns/:id/duplicate
```

**Response:**

```json
{
  "id": 2,
  "title": "Summer Campaign 2025 (Copy)",
  "description": "Summer influencer campaign",
  ...
}
```

#### Export Campaign

```http
GET /api/campaigns/:id/export?format=pdf
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| format | string | Export format (pdf, excel, csv) |

**Response (PDF):**

Returns campaign data for client-side PDF generation:

```json
{
  "campaign": {
    "id": 1,
    "title": "Summer Campaign 2025",
    "description": "Summer influencer campaign",
    "selectedFields": ["name", "username", "platforms", "followersCount"],
    "campaignInfluencers": [...]
  }
}
```

**Response (Excel/CSV):**

Returns file download with campaign data.

### Analytics

#### Get Analytics

```http
GET /api/analytics
```

**Response:**

```json
{
  "totalInfluencers": 100,
  "totalCampaigns": 10,
  "totalReach": 5000000,
  "averageRate": 1500.50,
  "byCategory": [
    {
      "category": "Beauty",
      "count": 25
    },
    {
      "category": "Fashion",
      "count": 20
    }
  ],
  "byRegion": [
    {
      "name": "Riyadh",
      "count": 30
    },
    {
      "name": "Jeddah",
      "count": 25
    }
  ],
  "byGender": [
    {
      "gender": "Male",
      "count": 45
    },
    {
      "gender": "Female",
      "count": 55
    }
  ],
  "byPlatform": [
    {
      "platform": "Instagram",
      "count": 80
    },
    {
      "platform": "TikTok",
      "count": 60
    }
  ],
  "rateDistribution": [
    {
      "range": "0-500",
      "count": 20
    },
    {
      "range": "500-1000",
      "count": 30
    }
  ],
  "followersDistribution": [
    {
      "range": "0-10K",
      "count": 15
    },
    {
      "range": "10K-50K",
      "count": 35
    }
  ]
}
```

### Import/Export

#### Export Influencers

```http
GET /api/export?format=excel
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| format | string | Export format (excel, csv) |

**Response:**

File download with all influencer data.

#### Import Influencers

```http
POST /api/import
```

**Request Body:**

Form data with file upload:

```
Content-Type: multipart/form-data

file: [Excel or CSV file]
```

**Response:**

```json
{
  "message": "Imported 50 influencers successfully",
  "count": 50,
  "errors": []
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently, there is no rate limiting. This should be implemented for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Data Validation

All endpoints use Zod schemas for validation. Invalid data will return a 400 error with details.

## Pagination

List endpoints support pagination:

- Default page size: 20
- Maximum page size: 100
- Page numbers start at 1

## Sorting

List endpoints support sorting:

- `sortBy`: Field name to sort by
- `sortOrder`: `asc` or `desc`

## Filtering

Influencer endpoint supports advanced filtering:

- Multiple filters can be combined
- Array parameters should be sent as comma-separated values
- Range filters use min/max parameters

## Examples

### cURL Examples

**Get all influencers:**

```bash
curl http://localhost:3000/api/influencers
```

**Create influencer:**

```bash
curl -X POST http://localhost:3000/api/influencers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Al-Saud",
    "username": "@ahmed_saud",
    "platforms": ["Instagram"],
    "categoryId": 1,
    "gender": "Male",
    "advertisingRate": 1500,
    "followersCount": 50000,
    "regionId": 1
  }'
```

**Filter influencers:**

```bash
curl "http://localhost:3000/api/influencers?categoryIds=1&gender=Female&minFollowers=10000"
```

### JavaScript/Fetch Examples

**Get all influencers:**

```javascript
const response = await fetch('/api/influencers');
const data = await response.json();
console.log(data.influencers);
```

**Create influencer:**

```javascript
const response = await fetch('/api/influencers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Ahmed Al-Saud',
    username: '@ahmed_saud',
    platforms: ['Instagram'],
    categoryId: 1,
    gender: 'Male',
    advertisingRate: 1500,
    followersCount: 50000,
    regionId: 1,
  }),
});
const data = await response.json();
console.log(data);
```

**Update influencer:**

```javascript
const response = await fetch('/api/influencers/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    advertisingRate: 2000,
  }),
});
const data = await response.json();
console.log(data);
```

## Future Enhancements

- Authentication and authorization
- Rate limiting
- Webhooks for real-time updates
- Bulk operations for campaigns
- Advanced search with Elasticsearch
- GraphQL API
- API versioning

---

**Version:** 1.0.0  
**Last Updated:** October 2, 2025
