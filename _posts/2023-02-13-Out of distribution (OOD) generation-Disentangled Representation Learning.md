---
title: Out of distribution (OOD)-Disentangled Representation Learning 
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

<p>Disentangled representation learning aims to learn representations where distinct and informative factors of variations in data are separated. This is considered a property of good representation and potentially benefits out-of-distribution generalization. In this article, we will discuss different representation learning techniques.</p>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3);" size="3" width="80%" />
<p><strong>Content</strong></p>
<ul>
<li>InfoGAN&nbsp;
<ul>
<li>Mutual information in deep learning</li>
<li>InfoGAN</li>
</ul>
</li>
<li>$\beta$-VAE</li>
</ul>
<p>&nbsp;</p>
<h3>InfoGAN</h3>
<h4>Mutual information in deep learning</h4>
<p>Mutual information is defined as:</p>
<p>$$I(\mathbb{x},\mathbb{y})=H(\mathbb{x})-H(\mathbb{x}|\mathbb{y})$$</p>
<p>Where $H(&middot;)$ is the entropy. $H(\mathbb{x}|\mathbb{y})$ are conditional entropies.</p>
<p>$$\begin{align*} H(\mathbb{x})-H(\mathbb{x}|\mathbb{y})&amp;=\sum_{y\in Y}p(y)H(\mathbb{x}|y)&amp;=\sum_{y\in Y}p(y)\sum_{x \in X}-\log(p(x|y))=-\sum_{y\in Y}\sum_{x \in X}p(y)\log(p(x|y))\end{algin*}$$</p>