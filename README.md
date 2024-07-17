# Real-Time Price Data Collection and Display

This project is a mini-website for collecting and displaying real-time price data for stocks and cryptocurrencies. It is built using Next.js, TypeScript, and Redux, with data stored in MongoDB.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)

## Prerequisites

- Docker (Preferable for direct build)
- Node.js (For local)
- NPM and PNPM (For local)


## Installation

1. With Docker:

    ```bash
    git clone https://github.com/GnomeAwd/coin-science.git
    docker-compose up
    ```

2. Without Docker:

    ```bash
    git clone https://github.com/GnomeAwd/coin-science.git
    .\install.sh
    
    ```
## Technologies Used

- **Frontend**: Next.js, TypeScript, Redux, shadcn/ui
- **Backend**: TypeScript
- **Database**: MongoDB
- **API for Data**: LiveCoinWatch


## Features

- Poll real-time price data every few seconds for 5 cryptocurrencies.
- Store the collected data in a MongoDB database.
- Fetch and display the most recent 20 entries for a selected stock or cryptocurrency.
- Dynamic table updating in real-time with new data.
- Dropdown to select the cryptocurrency being displayed.

