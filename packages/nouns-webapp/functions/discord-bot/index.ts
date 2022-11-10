import { Handler } from '@netlify/functions';
import { utils } from 'ethers';
import { nounsAuctions } from '../theGraph';
import fetch from 'node-fetch';

const handleBid = async (response: any) => {
  const { tag, txs = [], confirmed } = response;
  console.log('handleBid');
  if (txs.length < 1) return {};
  console.log('handleBid after tx');

  let auctions: any[] = [];
  let asset: any = {};

  try {
    auctions = await nounsAuctions();
    const auction = auctions[0];
    asset =
      auctions.length > 0
        ? await fetch(
            `https://api.opensea.io/api/v1/asset/0x88a05b2eec82fe180ab408ad9d4a5b581d93c812/${
              auction.id ?? 1
            }/?include_orders=false`,
            { method: 'GET' },
          ).then(response => response.json())
        : {};
  } catch (error) {
    console.log('Cant get images', error);
  }

  console.log('indo pro return', tag);
  return {
    // content: `\`\`\`${JSON.stringify({ txs, tag, confirmed, logs })}\`\`\``,
    embeds: [
      {
        title: `New Bid - ${tag === 'bid-west' ? 'WEST' : 'EAST'} team`,
        url: 'https://nounba.wtf',
        color: tag === 'bid-west' ? 15746104 : 20203,
        fields: [
          {
            name: 'Amount',
            value: utils.formatEther(txs[0]?.value ?? 0).toString(),
          },
          {
            name: 'Confirmed',
            value: confirmed,
          },
          {
            name: 'Nonce',
            value: txs[0]?.nonce ?? 0,
          },
        ],
        author: {
          name: 'NounBA Bid Bot',
        },
        thumbnail: {
          url: asset?.image_thumbnail_url ?? '',
        },
      },
    ],
    attachments: [],
  };
};

const discordMessageBuilder = async (
  tag: 'bid-west' | 'bid-east' | 'auction-west' | 'auction-east',
  response: any,
) => {
  console.log('carregou');
  if (tag.includes('bid')) return handleBid(response);

  console.log('handle auction');
  const { logs, confirmed } = response;
  let auctions: any[] = [];
  let asset: any = {};

  try {
    auctions = await nounsAuctions();
    // console.log(auctions);
    const auction = auctions[0];
    asset =
      auctions.length > 0
        ? await fetch(
            `https://api.opensea.io/api/v1/asset/0x88a05b2eec82fe180ab408ad9d4a5b581d93c812/${
              auction.id ?? 1
            }/?include_orders=false`,
            { method: 'GET' },
          ).then(response => response.json())
        : {};
  } catch (error) {
    console.log('Cant get images', error);
  }
  return {
    embeds: [
      {
        title: `New Auction Started`,
        url: 'https://nounba.wtf',
        color: tag === 'auction-west' ? 15746104 : 20203,
        fields: [
          {
            name: 'Team',
            value: tag === 'auction-west' ? 'WEST' : 'EAST',
          },
          {
            name: 'Confirmed',
            value: confirmed,
          },
          {
            name: 'transactionHash',
            value: logs[0]?.transactionHash ?? 0,
          },
        ],
        author: {
          name: 'NounBA Auction Bot',
        },
        image: {
          url: asset?.image_preview_url ?? '',
        },
      },
    ],
    attachments: [],
  };
};

const handler: Handler = async (event, context) => {
  const response = JSON.parse(event.body);
  const { tag, txs } = response;

  const message = await discordMessageBuilder(tag, response);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: response ? JSON.stringify(message) : '{}',
  };

  // console.log('response:::::', { ...response, abi: {} });
  // console.log('OPTIONS:::::', options);
  fetch(process.env.DISCORD_WEBHOOK, options)
    .then(response => response.json())
    .then(response => console.log('RESPONSE::', response))
    .catch(err => console.error(err));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'ok',
    }),
  };
};

export { handler };
