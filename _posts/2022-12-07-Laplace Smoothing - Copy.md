---
title: Application of 
categories:
- Statistics
feature_image: "https://scontent-ams2-1.xx.fbcdn.net/v/t39.30808-6/318727714_1298950054279522_1327222508011670093_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=TnxHVTXAD_IAX-HmZVu&_nc_ht=scontent-ams2-1.xx&oh=00_AfBSzcy1lv2fJGWPylw7pRDyxpG_NNwrFmcdUXnopbawrg&oe=6394F523"
---
<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

**Concept**

When calculating the probability of a specific event $a$, if the evet $a$ never happened in the dataset $S$, the probability of $a$ will become $0$, $P(a)=0$. However, $P(a)=0$ is obviously unreasonable since we can not say $P(a)=0$ only because
we do not observe $a$ in the dataset. The invention of **Laplace Smoothing** is to solve this problem.

To solve the zero probability problem mentioned above, Laplace, a french mathematician, proposed a solution by adding $1$ to estimate the probability of phenomena that have not occurred before. The reasonability of this method is *If the dataset is large enough, adding one will barely change the probability*.

**Application in maximum likelihood estimation**

For a random variable $z$, the range of $z$ is $\lbrace 1,2,3,4..k-1,k \rbrace$, after *m* trials of observation, the result is $\lbrace z^1,z^2,z^3...z^{m-1},z^{m} \rbrace$, The probability of
$z^j$ is:

$$\varphi_{z=j}=\frac{\sum_{i=1}^{m}I\{z_i=j\}}{m}$$

The problem with $\varphi_{z=j}$ is if $j$ does not happen in the experiment, then, the estimation of $\varphi_{z=j}$ will be $0$.
 If apply Laplace Smoothing, the calculation will become:

$$\varphi_{z=j}=\frac{\sum_{i=1}^{m}I\{z_i=j\}+1}{m+k}$$

**Application in Markov chain**

In general, the transition probability of a $m$-order Markov Chain is trained by:

$$P(c_{m+1}|c_{m}c_{m-1}...c_{2}c_{1})=\frac{c_{m+1}c_{m}...c_{2}c_{1}}{\sum_{c} count(cc_{m}c_{m-1}...c_{2}c_{1})}$$

If apply Laplace Smoothing, the calculation will become:

$$P(c_{m+1}|c_{m}c_{m-1}...c_{2}c_{1})=\frac{c_{m+1}c_{m}...c_{2}c_{1}+1}{\sum_{c} \{count(cc_{m}c_{m-1}...c_{2}c_{1})+1\}}$$

*Aside from adding 1, we could also add a \(0<a<=1\) instead of 1.*

Reference:
https://blog.csdn.net/weixin_44305332/article/details/118615826
https://www.cnblogs.com/hbuwyg/p/13220804.html