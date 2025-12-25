# system-design-vault,
A curated collection of **system design knowledge + real-world case studies**.   This repo documents my journey mastering **High-Level Design (HLD)** and **Low-Level Design (LLD)** — from theory to practice — with recruiter-facing examples.

## Real-world HLD (High-Level Design) essentials — to build scalable systems like Google, Facebook, Netflix.

## 🏗️ Real-World HLD (High-Level Design) Essentials


### Requirements Gathering

# 📌 Step 1: Requirements Gathering Framework


When designing any large-scale system, you always split requirements into two buckets:

## ✅ Functional Requirements (What the system must do)

### Instagram

Upload photos/videos

Follow/unfollow users

News feed generation

Likes, comments, shares

Notifications

### YouTube

Upload videos

Stream videos (adaptive bitrate)

Search & recommendations

Subscriptions & notifications

Monetization (ads, premium)

### URL Shortener (Demo)

Generate short URL

Redirect short → long URL

Track analytics (click count, geo, device)


## ✅ Non-Functional Requirements (How the system behaves)

### Availability

#Instagram: must be up 24/7 globally.

#YouTube: downtime = millions lost in ad revenue.

#URL Shortener: critical for links embedded everywhere.

### Latency

Instagram: feed load < 200ms.

YouTube: video playback must start < 1s.

URL Shortener: redirect < 50ms.

### Scalability

Instagram: billions of posts, millions of concurrent users.

YouTube: petabytes of video, global CDN distribution.

URL Shortener: billions of URLs, high read-heavy traffic.

### Cost Efficiency

Instagram: optimize infra for storage + CDN.

YouTube: video transcoding is expensive → need efficient pipelines.

URL Shortener: cheap storage, caching for hot URLs.


# 📌 Step 2: Trade-offs (Consistency vs. Performance vs. Reliability)
This is where system design mastery comes in — you must articulate trade-offs.

### Consistency

Instagram: feed may show slightly stale likes/comments (eventual consistency).

YouTube: view counts may lag (eventual consistency).

URL Shortener: must be strongly consistent (short → long mapping must never fail).

### Performance

Instagram: caching feed results improves latency but may show outdated posts.

YouTube: CDN improves performance but requires replication delays.

URL Shortener: cache hot URLs in Redis for instant redirects.

### Reliability

Instagram: replication across regions ensures uptime.

YouTube: multiple data centers, failover for streaming.

URL Shortener: fallback to DB if cache fails.
