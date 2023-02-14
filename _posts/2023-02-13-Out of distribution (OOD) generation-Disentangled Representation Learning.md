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
<p>$$H(\mathbf{x}|\mathbf{y})=\sum_{y\in Y}p(y)H(\mathbf{x}|y) =\sum_{y\in Y}p(y)\sum_{x \in X}-log(p(x|y))=-\sum_{y\in Y}\sum_{x \in X}p(y)log(p(x|y))$$</p>
<p>Substitute conditional entropy in mutual information:</p>
<p>$$ \begin{align*}<br />I(\mathbf{x},\mathbf{y})&amp;=H(\mathbf{x})-H(\mathbf{x}|\mathbf{y})\\&amp;=\sum_{y\in Y}\sum_{x \in X}p(y)log(p(x|y))+H(X)\\ &amp;=\mathbb{E}_{y \sim p(y)}[\mathbb{E}_{x \sim p(x)}log(p(x|y))]+H(X)\\&amp;=\mathbb{E}_{y \in p(y)}[\mathbb{E}_{x \sim p(x)}log(p(x|y))+\mathbb{E}_{x \sim p(x)}q(x|y)-\mathbb{E}_{x \sim p(x)}q(x|y)]+H(X)\\&nbsp; &amp;=\mathbb{E}_{y \in p(y)}[\overbrace{D_{KL}(p(&middot;|x)||q(&middot;|x))}^{\geq 0}+\mathbb{E}_{x \sim p(x)}q(x|y)]+H(X)\\ &amp;\geq \mathbb{E}_{y \in p(y)}[\mathbb{E}_{x \sim p(x)}q(x|y)]+H(X)\end{align*}&nbsp;$$</p>




