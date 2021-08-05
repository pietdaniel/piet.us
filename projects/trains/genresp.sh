#!/bin/sh
PUBLIC_CRED=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE
echo "Content-type:application/json\r\n"
echo "["
curl -s "https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=MTASBWY%3AA33&apikey=$PUBLIC_CRED" \
  -H 'Connection: keep-alive' \
  -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36' \
  -H 'Origin: https://new.mta.info' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://new.mta.info/' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --compressed | jq -r '.[0].groups[] | "\"\(.headsign),\(.route.shortName),\(.times[] | .arrivalFmt)\","'
curl -s "https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=MTASBWY%3A626&apikey=$PUBLIC_CRED" \
  -H 'Connection: keep-alive' \
  -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36' \
  -H 'Origin: https://new.mta.info' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://new.mta.info/' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --compressed | jq -r '.[0].groups[] | "\"\(.headsign),\(.route.shortName),\(.times[] | .arrivalFmt)\","'
echo '"SENTINAL"]'