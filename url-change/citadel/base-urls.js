import * as fs from 'fs'

const urls = [
    "https://drive.google.com/file/d/1bu-936XvC6OGw9B2yexMxOsYSYdeZJol/view?usp=sharing", 
    "https://drive.google.com/file/d/1bvcvP5gbupIW2zf7T5jzWX7Tfi_TZViZ/view?usp=sharing", 
    "https://drive.google.com/file/d/1bvd1u7s8j74uMU5gTIZYpFHn6EIhjD6R/view?usp=sharing", 
    "https://drive.google.com/file/d/1bxJldjF4sncyfXyRA7Ywb0pogVzg60DB/view?usp=sharing", 
    "https://drive.google.com/file/d/1bxKH8xMBCoBhMMP_LV_3KpWGaAU0UeSd/view?usp=sharing", 
    "https://drive.google.com/file/d/1bxeaqSg4K_eg2hEgAd3DJGX7OmXR1mTw/view?usp=sharing", 
    "https://drive.google.com/file/d/1by5yiRvtz-BOBz8o5IuJfAFijcvNtT32/view?usp=sharing", 
    "https://drive.google.com/file/d/1by7fFvyVCRs7ED2zWWaEKVcrhH_K2F7j/view?usp=sharing", 
    "https://drive.google.com/file/d/1byD6Vyz7E2niw2PBNIrU2bo-gUGlX0HN/view?usp=sharing", 
    "https://drive.google.com/file/d/1c-0TexWmwEMuaGoHVOzmefUKtZiqixDS/view?usp=sharing", 
    "https://drive.google.com/file/d/1c-NbhCSrIdNfSoCjS70FkEvCrqBeFoMA/view?usp=sharing", 
    "https://drive.google.com/file/d/1c-jSXSyg5WPg2N_xVXMRBJIh9oVwU23S/view?usp=sharing", 
    "https://drive.google.com/file/d/1c0Xjr5AQ_zw486AwsH2MTkQih4qPdsiB/view?usp=sharing", 
    "https://drive.google.com/file/d/1c0afXt4BCRR46jRW-VBZn5Nwtxodv_E5/view?usp=sharing", 
    "https://drive.google.com/file/d/1c0eMz-Utex762WqZ1bXVxfZPgF5g8U6S/view?usp=sharing", 
    "https://drive.google.com/file/d/1c1RxwG6PyllrvhPbhZLJelkiBQn6OLo5/view?usp=sharing", 
    "https://drive.google.com/file/d/1c1_4vi2gzDpo-s0PWuye76B_9sZwgIvd/view?usp=sharing", 
    "https://drive.google.com/file/d/1c2BvnNG667Oj8LSVaVx2At6DOK5276l5/view?usp=sharing", 
    "https://drive.google.com/file/d/1c4b4rtigalbB6zjo_vaNk-h_3fxzGaVl/view?usp=sharing", 
    "https://drive.google.com/file/d/1c4wcRLLANiKk-AEltTVmL3EUnq5zz5-m/view?usp=sharing", 
    "https://drive.google.com/file/d/1c5A4XZ5ZSw142zGpASzWQhdRQxf7CnyL/view?usp=sharing", 
    "https://drive.google.com/file/d/1c6IrVzBDdyDpKJ0b1aw8yKWLqmo5n_9j/view?usp=sharing", 
    "https://drive.google.com/file/d/1c6_yKbVtyzQXkccnsNxMa2yA292cX61f/view?usp=sharing", 
    "https://drive.google.com/file/d/1c85df6o_Ua7QCuG8WVv2gEvWZwUO1cPy/view?usp=sharing", 
    "https://drive.google.com/file/d/1c8SYjv0Z59KBQvyPaHkNeHE_RPhp_qYW/view?usp=sharing", 
    "https://drive.google.com/file/d/1c9I2vMuSYPjtW-AQ8hIds8TmTEh_k_az/view?usp=sharing", 
    "https://drive.google.com/file/d/1c9RCw7DKpfQ6KYsGFFyMbsaKcs41MB6y/view?usp=sharing", 
    "https://drive.google.com/file/d/1c9_gAfCxcKErZ67gz4D5Hh5NWFLbO5R-/view?usp=sharing", 
    "https://drive.google.com/file/d/1c9eTf20W-tNf-uXT8NyDC8wzj6Xq6t1y/view?usp=sharing", 
    "https://drive.google.com/file/d/1c9t_j8BaIgLzbXlUTRbgG3PKznIN01ht/view?usp=sharing", 
    "https://drive.google.com/file/d/1cBYZOnj-Ddn7U16bxFzZXe1_2pdXeR60/view?usp=sharing", 
    "https://drive.google.com/file/d/1cC0ZJT470YWSz6p-HEklbm602j9Gm2sE/view?usp=sharing", 
    "https://drive.google.com/file/d/1cC8ymLeg6oo3qrvFhDwvj1juKc3uDV_d/view?usp=sharing", 
    "https://drive.google.com/file/d/1cCd_6Cixpv1HESPrn7iWARwKUHzbfwhT/view?usp=sharing", 
    "https://drive.google.com/file/d/1cCr9811SngEwUhwl-EEzJFbbkmCe9klq/view?usp=sharing", 
    "https://drive.google.com/file/d/1cCwvIeQJ5y1lhMCdsWpi4Z2w8bqah0LI/view?usp=sharing", 
    "https://drive.google.com/file/d/1cDIHe9UJgO1LCewz7KLiF7b8I6aX-pYr/view?usp=sharing", 
    "https://drive.google.com/file/d/1cDSVoYFGb52D2_vc4uIMOEwe1zxLQp2V/view?usp=sharing", 
    "https://drive.google.com/file/d/1cEfzeKvnVrk4xYZOxfv_h1IWWz_xkRJ6/view?usp=sharing", 
    "https://drive.google.com/file/d/1cFGIRiBzYud9kM1Pqyncvfv6zOKWzWHr/view?usp=sharing", 
    "https://drive.google.com/file/d/1cGsr-SK2RLNjF9NLJ103jMwEyl0msoAn/view?usp=sharing", 
    "https://drive.google.com/file/d/1cGuLL0peg-WaN3HsHKn_j4KnJQ9Yb_NB/view?usp=sharing", 
    "https://drive.google.com/file/d/1cGuax8QsfWTUCSzgzQSKMbkXAK5MikBz/view?usp=sharing", 
    "https://drive.google.com/file/d/1cHEnu8OCb_rAk-IEdlQY09pejx3qFosC/view?usp=sharing", 
    "https://drive.google.com/file/d/1cK5kOE5pUJNzSbl8ZWhdMBrnhE-2Uh1U/view?usp=sharing", 
    "https://drive.google.com/file/d/1cKxsWg30RbdRTooIHGu3Tqh8upowypVG/view?usp=sharing", 
    "https://drive.google.com/file/d/1cL-aGXnDBIF7F_yOAhn_hMhs2xrRWDje/view?usp=sharing", 
    "https://drive.google.com/file/d/1cLLpv3MLuTQI7bv5XWo_5p6ZEwmduUJ5/view?usp=sharing", 
    "https://drive.google.com/file/d/1cMyzPxs8yYgY0BFh8Wb4v_z2YHhQoJ3N/view?usp=sharing", 
    "https://drive.google.com/file/d/1cNG1xopgrK-7XGRND21nQHnr0kVjx627/view?usp=sharing", 
    "https://drive.google.com/file/d/1cNpNiFsBLJUvHOnX8Oi5mr_9qhLbPihD/view?usp=sharing", 
    "https://drive.google.com/file/d/1cP8IAEYPwXWRhh6FzWEj-M8knCsC2Rj-/view?usp=sharing", 
    "https://drive.google.com/file/d/1cPHxXwk6_qCOzeTLPALtm7BuD1uD0p_E/view?usp=sharing", 
    "https://drive.google.com/file/d/1cPQWxPy3A3YBhv2VTu8QF_YL8DdDZtl-/view?usp=sharing", 
    "https://drive.google.com/file/d/1cQGmZAaCaohXMHG3jl2ejELTkCglATdl/view?usp=sharing", 
    "https://drive.google.com/file/d/1cQOPT0fr2GojL4bDPAMdB84fLWqbt5TL/view?usp=sharing", 
    "https://drive.google.com/file/d/1ohsxvGWnbGZKe1nVt6cHPD4CeqDkdg5a/view?usp=sharing"
]

const last_urls = []

urls.forEach((e) => {
    const new_urls = e.toString().replace("file/d/", "uc?id=")
    last_urls.push(new_urls)
})

fs.writeFile('./new-urls/base-urls.json', JSON.stringify(last_urls, null, 2), (err) => {
    if (err) throw err
    console.log("It be done!")
})