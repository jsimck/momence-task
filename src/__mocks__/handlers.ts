import { http, HttpResponse } from 'msw';

import { MOCK_CNB_BASE_URL } from '../../api/__test__/test-constants';

export const handlers = [
  http.get(MOCK_CNB_BASE_URL, () => {
    return HttpResponse.text(
      `11 Dec 2025 #240
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.764
Brazil|real|1|BRL|3.800
Bulgaria|lev|1|BGN|12.350
Canada|dollar|1|CAD|14.983
China|renminbi|1|CNY|2.929
Denmark|krone|1|DKK|3.243
EMU|euro|1|EUR|24.220
Hongkong|dollar|1|HKD|2.657
Hungary|forint|100|HUF|6.309
Iceland|krona|100|ISK|16.299
IMF|SDR|1|XDR|28.163
India|rupee|100|INR|22.891
Indonesia|rupiah|1000|IDR|1.240
Israel|new shekel|1|ILS|6.437
Japan|yen|100|JPY|13.291
Malaysia|ringgit|1|MYR|5.030
Mexico|peso|1|MXN|1.138
New Zealand|dollar|1|NZD|12.019
Norway|krone|1|NOK|2.048
Philippines|peso|100|PHP|35.040
Poland|zloty|1|PLN|5.731
Romania|leu|1|RON|4.758
Singapore|dollar|1|SGD|15.989
South Africa|rand|1|ZAR|1.221
South Korea|won|100|KRW|1.406
Sweden|krona|1|SEK|2.233
Switzerland|franc|1|CHF|25.955
Thailand|baht|100|THB|65.106
Turkey|lira|100|TRY|48.512
United Kingdom|pound|1|GBP|27.679
USA|dollar|1|USD|20.674`,
    );
  }),
];
