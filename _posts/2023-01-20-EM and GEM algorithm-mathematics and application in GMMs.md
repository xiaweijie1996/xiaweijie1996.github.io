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
<p>probability models sometimes have not only observable variables but also hidden variables. If all variables are observable, then the parameters of the probability models can be estimated by the maximum likelihood estimation. However, when there are hidden variables. <strong>EM algorithm is used to estimate the parameters of probability models with hidden variables using maximum likelihood estimation.</strong>&nbsp;</p>
<p>An example:</p>
<p>If there are three coins, which are $A,B,C$. The probability of the coins coming up heads are $\pi,p,q$, respectively. Conducting the following experiment: First toss coin $A$, if the result is head up, then toss $B$, otherwise, toss $C$. If the result of the second toss is heads, then record 1. Otherwise, record 0. Repeat experiment $n$ times. if $n=10$, we observe the result:</p>
<p>$$1,1,0,1,0,0,1,0,1,1$$</p>
<p>Assuming we can only observe the results of the second toss, how do we estimate the probability that the toss is heads?</p>
<p>Answer:</p>
<p>$$\begin{align*}&nbsp; P(y|\theta) &amp;=\sum_z P(y,z|\theta) \\ &amp;= \sum_z P(z|\theta)P(y|z,\theta)\\ &amp;= \pi p^{y}(1-p)^{1-y}+(1-\pi)q^{y}(1-q)^{1-y} \end{align*}$$</p>
<p>Where $y$ is the observable variable, its value is $1$ or $0$. $z$ is the hidden variable which represents the toss result of $A$, $$\theta=(\pi, p, q)$$ is the parameters of the probability model.&nbsp;</p>
<p>Using $Y=(Y_1,...,Y_n)^{T}$ represents the observable results, and&nbsp; $Z=(Z_1,...,Z_n)^{T}$ reprents the unobservable results. The likelihood function of the observable data is:</p>
<p>$$\begin{align*}&nbsp; P(Y|\theta) &amp;= \sum_{Z} P(Z|\theta)P(Y|Z,\theta) \\ &amp;=\prod_{Z} \pi p^{y}(1-p)^{1-y}+(1-\pi)q^{y}(1-q)^{1-y} \end{align*}$$</p>
<p>Then the method is to find the maximum likelihood estimation:</p>
<p>$$\hat{\theta} = \arg \max_{\theta} log P(Y|\theta)$$</p>
<p>The method randomly selects the initial value and then does the iteration. However, the different initial values will get different results. <strong>The EM algorithm is sensitive to the initial values.</strong>&nbsp;</p>
<p>&nbsp;</p>



updata soon...