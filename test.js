import http from 'k6/http';
import { sleep } from 'k6';

export default function () {

  const responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
  ]);

  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });

  // const url = 'https://aliza.kudsonmoo.co/api/v1/devices';
  // const headers = {
  //   headers: {
  //     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0Y1pNLThKRzZwWkIwbEZBcWdkdVJwQldzcXJaNXpQMUI1Wl9uZkVsc1NvIn0.eyJleHAiOjE3NTAxMzIxNzEsImlhdCI6MTc1MDA0NTc3MSwianRpIjoiYmMzZDhkMmUtZTI0YS00OTBiLTg4NjctYzE1MzMwOGJmNDY4IiwiaXNzIjoiaHR0cHM6Ly9hbGl6YS5rdWRzb25tb28uY28vc3NvL3JlYWxtcy9rbHlueCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxM2IyNGMxYy1lNDA1LTRkODItOTZiNC0yNTgxM2ExMzI5YWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJndyIsInNpZCI6IjRmNDk4NjNiLWUzYWQtNGYzNS1iOWQxLTA4ZTU2MGJhMDg0YyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1rbHlueCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGN1c3RvbS1hdHRyaWJ1dGUgZW1haWwiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFkbWluIGtseW54IiwicGVybWlzc2lvbiI6WyJjcmVhdGUiLCJkZWxldGUiLCJyZWFkIiwid3JpdGUiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJhdmF0YXIiOiIvczMva2x5bngvcGVyc29uL2FkbWluL3VzZXIucG5nIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwibG9jYWxlIjoidGgiLCJmYW1pbHlfbmFtZSI6ImtseW54IiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yQGtseW54LmNvIn0.sOvpp8pVcJgsl7ort5JssYLs4PrSLgLrWsiXM7PgXeRI5Jl-6xYEnlkSGapIe5kRWRtRfGN9sJV8BixsUOEShfFrEhe-Y3AveDLS25cKReerubJV4pjpXy1waB_Tri6kVxztESkOdBmZ3lv9rv1pXBuQpKtcNSUlsGObTjcS4KbeLHNKnZRfjwUNtYHtQx7RmRt5XHPgsi5EpZSgCvkXgDieJy2KdrcTL73jrEe3XTSXuSO-Q8NGBoLSaZtFFNaiIdhtv_0L1Z7a3yJGL0R7fBCU2tG0W3guZkXg6jDq39iy3j_9A5zIye5_cWXROFl2gg-_JIuYNMOkPVo-rG17dw'
  //   },
  // };
  // http.get(url, headers);

  sleep(1);
}
