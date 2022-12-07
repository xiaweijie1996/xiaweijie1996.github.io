---
title: Application of Laplace Smoothing
categories:
- Statistics
feature_image: "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/318727714_1298950054279522_1327222508011670093_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=TnxHVTXAD_IAX-HmZVu&_nc_ht=scontent-ams2-1.xx&oh=00_AfBSzcy1lv2fJGWPylw7pRDyxpG_NNwrFmcdUXnopbawrg&oe=6394F523"
---

<script type="text/x-mathjax-config">  
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true,
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
        }
    });
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@2.7.5/MathJax.js?config=TeX-AMS_HTML"></script>




**Concept**

When calculating the probability of a specific event *a*, if the evet *a* never happened in the dataset *S*, the probability of *a* will become *0*, *P(a)=0*. However, *P(a)=0* is obviously unreasonable since we can not say *P(a)=0* only because
we do not observe *a* in the dataset. The invention of **Laplace Smoothing** is to solve this problem.

To solve the zero probability problem mentioned above, Laplace, a french mathematician, proposed a solution by adding 1 to estimate the probability of phenomena that have not occurred before. The reasonability of this method is *If the dataset is large enough, adding one will barely change the probability*

**Application in maximum likelihood estimation**

For a random variable *z*, the range of *z* us https://latex.codecogs.com/gif.latex?\\{1,2,3,4..k-1,k\}, after *m* trials of observation, the reslut is https://latex.codecogs.com/gif.latex?\\{z^1,z^2,z^3...z^(m-1),z^(m)\}, The 
maximum likelihood estimation for https://latex.codecogs.com/gif.latex?\z^j is:

$$\varphi_{z=j}=\frac{\sum{i=1}^{m}I\{z_i=j\}}{m}$$

The problem with https://latex.codecogs.com/gif.latex?\$$\varphi_{z=j} is if *j* does not happen in the experiment, then, the estimation of https://latex.codecogs.com/gif.latex?\$$\varphi_{z=j} will be https://latex.codecogs.com/gif.latex?\0.
 If apply Laplace Smoothing, the calculation will become:

https://latex.codecogs.com/gif.latex?\$$\varphi_{z=j}=\frac{\sum_{i=1}^{m}I\{z_i=j\}+1}{m+k}$$

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" style="border:none;">

<img src="https://latex.codecogs.com/png.latex? \Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}">


