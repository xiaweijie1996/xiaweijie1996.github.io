---
title: EM and GEM algorithm-mathematics and application in GMMs
categories:
- Generative model
- Machine Learning
feature_image: "https://i.postimg.cc/wBgmqWcX/wallhaven-kx98xd.jpg"
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

<p>In this article, I would like to discuss the Expectation maximization algorithm (EM) and its related application in Gaussian mixture models (GMMs).</p>
<p>&nbsp;</p>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3);" size="3" width="80%" />
<p><strong>Content</strong></p>
<ul>
<li>Introduction to EM algorithm</li>
<li>Convergence of EM Algorithm</li>
<li>EM algorithm in GMMs</li>
<li>General EM</li>
</ul>
<p>&nbsp;</p>
<h3><strong>Introduction to EM algorithm</strong></h3>
<p>EM algorithm is an iterative algorithm which Dempster proposed in 1977. EM algorithm is used for the estimation of hidden variables in the probability models. EM algorithm has two steps: E step, compute the expectation; M step, find the maximization. This is why it is called EM algorithm.</p>
<p>probability models sometimes have not only observable variables but also hidden variables. If all variables are observable, then the parameters of the probability models can be estimated by the maximum likelihood estimation. However, when there are hidden variables. <strong>EM algorithm is used to estimate the parameters of probability models using maximum likelihood estimation.</strong>&nbsp;</p>
<p>A example:</p>

updata soon...