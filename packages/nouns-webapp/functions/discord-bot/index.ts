import { Handler } from '@netlify/functions';
import { has } from 'ramda';
import URL from 'url';
import https from 'https';

interface ErrorReason {
  error: string;
  message: string;
}

const errorBuilder = (error: string, message: string) => ({ error, message });

const invalidBodyCheck = (body: object | undefined | null): false | ErrorReason => {
  if (!body || !body?.streamId)
    return {
      error: 'empty_body',
      message: 'Request body is missing or empty',
    };
  if (!has('logs')) return errorBuilder('missing_logs', 'Request is missing logs');
  if (!has('txs')) return errorBuilder('missing_txs', 'Request is missing txs');
  if (!has('tag')) return errorBuilder('missing_tag', 'Request is missing tag');
  return false;
};

const isWest = (address: string) => address === process.env.WEST_ADDRESS;

const handler: Handler = async (event, context) => {
  const checkResult = invalidBodyCheck(event.body);
  if (checkResult) {
    return {
      statusCode: 400,
      body: JSON.stringify(checkResult),
    };
  }
  const { logs, tag, txs } = JSON.parse(event.body);

  const webhook_url = URL.parse(process.env.DISCORD_WEBHOOK);
  const options = {
    hostname: webhook_url.hostname,
    path: webhook_url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const req = https.request(options, function (res) {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');

    // Log data
    res.on('data', function (body) {
      console.log(`Body: ${body}`);
    });
  });

  req.end(
    JSON.stringify({
      content: null,
      embeds: [
        {
          title: `New Bid - ${isWest(txs[0].toAddress ?? '') ? 'WEST' : 'EAST'} team`,
          url: 'https://nounba.wtf',
          color: 14175511,
          fields: [
            {
              name: 'Amount',
              value: txs[0].value ?? 0,
            },
          ],
          author: {
            name: 'NounBA Bid Bot',
          },
        },
      ],
      attachments: [],
    }),
  );

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
