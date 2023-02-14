---
title: Out of distribution (OOD) generation-Disentangled Representation Learning 
categories:
- Generative model
- Machine Learning
feature_image: "https://i.postimg.cc/90b8d1jW/wallhaven-9mjoy1.jpg"
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
<p>$$I(\mathbb{x};\mathbb{y})=H(\mathbb{x})-H(\mathbb{x}|\mathbb{y})$$</p>
<p>Where $H(&middot;)$ is the entropy. $H(\mathbb{x}|\mathbb{y})$ are conditional entropies.</p>
<p>$$H(\mathbf{x}|\mathbf{y})=\sum_{y\in Y}p(y)H(\mathbf{x}|y) =\sum_{y\in Y}p(y)\sum_{x \in X}-log(p(x|y))=-\sum_{y\in Y}\sum_{x \in X}p(y)log(p(x|y))$$</p>
<p>Substitute conditional entropy in mutual information:</p>
<p>$$ \begin{align*}<br />I(\mathbf{x};\mathbf{y})&amp;=H(\mathbf{x})-H(\mathbf{x}|\mathbf{y})\\&amp;=\sum_{y\in Y}\sum_{x \in X}p(y)log(p(x|y))+H(\mathbf{x})\\ &amp;=\mathbb{E}_{y \sim p(y)}[\mathbb{E}_{x \sim p(x)}log(p(x|y))]+H(\mathbf{x})\\&amp;=\mathbb{E}_{y \in p(y)}[\mathbb{E}_{x \sim p(x)}log(p(x|y))+\mathbb{E}_{x \sim p(x)}log(q(x|y))-\mathbb{E}_{x \sim p(x)}log(q(x|y))]+H(\mathbf{x})\\&nbsp; &amp;=\mathbb{E}_{y \in p(y)}[\overbrace{D_{KL}(p(&middot;|x)||q(&middot;|x))}^{\geq 0}+\mathbb{E}_{x \sim p(x)}log(q(x|y))]+H(\mathbf{x})\\ &amp;\geq \mathbb{E}_{y \in p(y)}[\mathbb{E}_{x \sim p(x)}q(x|y)]+H(\mathbf{x})\end{align*} $$</p>
<p>Where $q$ is a variational distribution $q(x|y) \in Q$, for which we know the parameters [1].</p>
<p>$\mathbb{E}_{y \in p(y)}[\mathbb{E}_{x \sim p(x)}q(x|y)]+H(\mathbf{x})$ is the lower bound of $I(X,Y)$.</p>
<h4>InfoGAN</h4>
<p>The classic GAN plays a min-max game which can be expressed below:</p>
<p>$$\min \max V(D,G)=\mathbb{E}_{x \sim P_{data}}[LogD(x)]+\mathbb{E}_{z \sim noise}[log(1-D(G(z)))]$$</p>
<p>Where the $x$ is the distribution of real data, $z$ is the noise.</p>
<p>[2] introduce an infoGAN structure which can maximize the mutual information between a small subset of the latent variables and the observation. In [2], rather than using an unstructured noise vector, the noise is decomposed into two parts: (i) $z$, which is treated as the source of incompressible noise. (ii) $c$, which is called the latent code and will target the salient structured semantic features of the data distribution.&nbsp;</p>
<p>Define a loss in mutual information $L_I(G,1)$, which is the lower bound of mutual information $I(c,G(z,c))$.&nbsp;</p>
<p>$$L_I(G,Q)=\mathbb{E}_{c \sim P(c), x \sim G(z,c)}[logQ(c|x)]+H(c) \leq I(c;G(z,c))$$</p>
<p>Then adding $L_I(G,Q)$ variational regulation to original minimax function:</p>
<p>$$\min \max V_I(D,G)=\mathbb{E}_{x \sim P_{data}}[LogD(x)]+\mathbb{E}_{z \sim noise}[log(1-D(G(z)))]-\lambda L_I(G,Q)$$</p>
<p>$V_I(D,G)$ then actually define a infoGAN.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

waiting to updata


[1] Barber, David, and Felix Agakov. "The im algorithm: a variational approach to information maximization." Advances in neural information processing systems 16.320 (2004): 201.<br>
[2] Chen, Xi, et al. "Infogan: Interpretable representation learning by information maximizing generative adversarial nets." Advances in neural information processing systems 29 (2016).