import * as fs from 'fs'

const urls = [
    "https://drive.google.com/file/d/1dBjejdwgSThd4i8lOQnIIQzFJS9YvM3e/view?usp=sharing", 
    "https://drive.google.com/file/d/1dCuHi3eWFc7YKd7mvNyDOOqtaofRhMo6/view?usp=sharing", 
    "https://drive.google.com/file/d/1dCyXGrotznaR_q5St-VT7Z_Uf3WQG7zg/view?usp=sharing", 
    "https://drive.google.com/file/d/1dDejQC65hRc5DkP8bIP-jnu9q0H5mQ-g/view?usp=sharing", 
    "https://drive.google.com/file/d/1dE2xU74IBmHZZBJrjcWDjfBKt-MIXN5D/view?usp=sharing",
    "https://drive.google.com/file/d/1dEgl_RLriilV9n0FiX-M0p8XyUIcKwHt/view?usp=sharing", 
    "https://drive.google.com/file/d/1dFT7CT9wSLPc-dqTuys8LGKlR2BH6vkB/view?usp=sharing", 
    "https://drive.google.com/file/d/1dKiOSPUMvELBmrXxP93FlSEo5CvG2iln/view?usp=sharing", 
    "https://drive.google.com/file/d/1dL8tiyqQsDk6ghxuW1CgExd-gMnhNyGw/view?usp=sharing", 
    "https://drive.google.com/file/d/1dM1jLXeYYqFqv71d1qn1BpEROLYHnHJn/view?usp=sharing", 
    "https://drive.google.com/file/d/1dM9pqS8Jc3q5nfS0VUlVd0jSXNTDnZzO/view?usp=sharing", 
    "https://drive.google.com/file/d/1dN9YOoaF-ZGhDL0a7zccyMPoNeOJYya4/view?usp=sharing", 
    "https://drive.google.com/file/d/1dNgI7jj_yMDCssDloKjQ95LuxyVVqdzk/view?usp=sharing", 
    "https://drive.google.com/file/d/1dNhF4Bb99x9QAPm10lN1hjKzfb1iVdHL/view?usp=sharing", 
    "https://drive.google.com/file/d/1dPvSRynJjr_j0pQycz2BHLOBYGAw4PUr/view?usp=sharing", 
    "https://drive.google.com/file/d/1dQrJi60IeRvyZSiUWEZdcXrnAU1I3-AA/view?usp=sharing", 
    "https://drive.google.com/file/d/1dR91A2EB2Y4A4oJDqyYQgq3RhnA1_oGA/view?usp=sharing", 
    "https://drive.google.com/file/d/1dRIswUfgDxvAtC-VjHUPcvUJY4k0YLb0/view?usp=sharing", 
    "https://drive.google.com/file/d/1dRcA9MV277cTvQGjEWjkFpyag8ISwyz3/view?usp=sharing", 
    "https://drive.google.com/file/d/1dRwndQR2EnofxCdZu3LBjNNP3k0pnl02/view?usp=sharing", 
    "https://drive.google.com/file/d/1dSKPQ974ufQwhcIjjKiIcjjYKb0oDoJy/view?usp=sharing", 
    "https://drive.google.com/file/d/1dSX4_6_zPD47MlJ_Dl2hfi1dHRqKR49G/view?usp=sharing", 
    "https://drive.google.com/file/d/1dUfo6zdx4f75TdiOkJ5HtpjLFMd92n2L/view?usp=sharing", 
    "https://drive.google.com/file/d/1dVi4YztSj8U-W6ZMt4JCbT1yBCvDxDAl/view?usp=sharing", 
    "https://drive.google.com/file/d/1dVidan9AK5fD_gMy-rB5OKKkDNfxl23q/view?usp=sharing", 
    "https://drive.google.com/file/d/1dYRTfdamRoMx6mdjArIE1IkG0tHU_-y-/view?usp=sharing", 
    "https://drive.google.com/file/d/1dZhsdvW4K0ixrQIgguI--43DRz0Wb0QM/view?usp=sharing", 
    "https://drive.google.com/file/d/1d_JHbBqZLn3w4ThW1fdWtQ3zHtI3gnBf/view?usp=sharing", 
    "https://drive.google.com/file/d/1da75ClIlf2YZZXVq_oHs7zTnv_tA1lJS/view?usp=sharing", 
    "https://drive.google.com/file/d/1daKuA3I2q1aJxKqoUWf7qYPY-zfsUCtA/view?usp=sharing", 
    "https://drive.google.com/file/d/1db5jULqGgKiiIoNyV-Qv6EY3rcAQT0p5/view?usp=sharing", 
    "https://drive.google.com/file/d/1dboGO9Ihve2s9pmJyrcuG_CM4IaWVdsp/view?usp=sharing", 
    "https://drive.google.com/file/d/1dc-5pPG5-C3pxK5AHQeOwrkyNm9MOz82/view?usp=sharing", 
    "https://drive.google.com/file/d/1dcR8dnBVY2H-PsrKIs0bKygG2hyq4Qu9/view?usp=sharing", 
    "https://drive.google.com/file/d/1dcbjaZRT1K7bljAb460N1np--Wvardha/view?usp=sharing", 
    "https://drive.google.com/file/d/1ddmuJ5zNRa67gepBNvlwNfKpBv93UVE2/view?usp=sharing", 
    "https://drive.google.com/file/d/1deeHStXD89qqFdJdeHkV7vbhwyvQ1kA-/view?usp=sharing", 
    "https://drive.google.com/file/d/1dep7VPlpsIsvu_Xd6qOqxqcn0Btzemex/view?usp=sharing", 
    "https://drive.google.com/file/d/1df-TlxRvhWRsuSpBTWQpm2GpwF0kO7y0/view?usp=sharing", 
    "https://drive.google.com/file/d/1df18jcWrJ-bSC2A5ztaO0C50nflcyDRJ/view?usp=sharing", 
    "https://drive.google.com/file/d/1df5GllLMLhoMJujlkMm7fwRXr6fKY3Xi/view?usp=sharing", 
    "https://drive.google.com/file/d/1dgOMYJ8jjSQh8OL7i8AtsjyAHSzuIOri/view?usp=sharing", 
    "https://drive.google.com/file/d/1dgP0f13AhY2g7QhX05cW1NJocQC-Hubt/view?usp=sharing", 
    "https://drive.google.com/file/d/1dgfpx-qTbIVc4-98eDWgmK5DojVrhTYY/view?usp=sharing", 
    "https://drive.google.com/file/d/1dhvKP_-kcxNBNCXx1D_MlP5RpyIbaRUv/view?usp=sharing", 
    "https://drive.google.com/file/d/1di0CFC99OncpUnEv_HinSv27qN5xEiXL/view?usp=sharing", 
    "https://drive.google.com/file/d/1dio_C0kleEkpi3dnWtp7KltYX6f0tcdq/view?usp=sharing", 
    "https://drive.google.com/file/d/1djSyh-WUlg9lfoZu-g0JiLWDU55jLUku/view?usp=sharing", 
    "https://drive.google.com/file/d/1dlQcqboqdL_e2Wk2UvFx1rLLf62Wl-IT/view?usp=sharing", 
    "https://drive.google.com/file/d/1dlXju3OXyZeAfKTxvEB_dejU8QJFwbMz/view?usp=sharing", 
    "https://drive.google.com/file/d/1dlgahb5S1hiA2wa42XhPkilI1FEqNkqk/view?usp=sharing", 
    "https://drive.google.com/file/d/1dlkeWdqZdJG4KLEkS9KKSmNLqCNzEGrb/view?usp=sharing", 
    "https://drive.google.com/file/d/1dlv3X8vriphDHeqU2c9hILUz5-cd6mbw/view?usp=sharing", 
    "https://drive.google.com/file/d/1dmXdv8XVKcRp2gwMGjQFKfWA8v_Z2Ek_/view?usp=sharing", 
    "https://drive.google.com/file/d/1dmd_QO8uUFcVqx3RTkjPXd6LiO0Yb_TL/view?usp=sharing", 
    "https://drive.google.com/file/d/1dmz6nJQn2E4AhyBd-pi-NgBeI-OJ5jMy/view?usp=sharing", 
    "https://drive.google.com/file/d/1doLO2yg785xjvAGpfjritvx3_OnaCQ1t/view?usp=sharing", 
    "https://drive.google.com/file/d/1dolw8SQVT6TwdawXDcuCnENSCzNSHgLE/view?usp=sharing", 
    "https://drive.google.com/file/d/1dpAGKHIpRsNLpiY8k0VGMvTazVDeN82B/view?usp=sharing", 
    "https://drive.google.com/file/d/1dpQ4S_EoQhi_hu5E3YSdU6XXECSQaWL9/view?usp=sharing", 
    "https://drive.google.com/file/d/1dpUCfqdi6bws0mi9LlJ71lmLxKVH1YaY/view?usp=sharing"  
]

const last_urls = []

urls.forEach((e) => {
    const new_urls = e.toString().replace("file/d/", "uc?id=")
    last_urls.push(new_urls)
})

fs.writeFile('./new-urls/contrast-urls.json', JSON.stringify(last_urls, null, 2), (err) => {
    if (err) throw err
    console.log("It be done!")
})