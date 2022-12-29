---
title: GANs-From scrach to advanced
categories:
- Generative model
- Machine Learning
feature_image: "https://i.postimg.cc/Njyh1G9r/wallhaven-e7qzrw-2560x600.png"
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
<p><span style="font-family: 黑体; font-size: large;"><strong>Content</strong></span></p>
<ul>
<li><a style="color: grey;" href="#math"><span style="font-family: 黑体; font-size: large;">Mathematical background</span></a>
<ul>
<li><a style="color: grey;" href="#math1"><span style="font-family: 黑体; font-size: large;">Entropy and cross-entropy</span></a></li>
<li><a style="color: grey;" href="#math2"><span style="font-family: 黑体; font-size: large;">Kullback&ndash;Leibler divergence</span></a></li>
<li><a style="color: grey;" href="#math3"><span style="font-family: 黑体; font-size: large;">Jensen&ndash;Shannon divergence</span></a></li>
<li><a style="color: grey;" href="#math4"><span style="font-family: 黑体; font-size: large;">Manifold</span></a></li>
</ul>
</li>
<li><a style="color: grey;" href="#GAN"><span style="font-family: 黑体; font-size: large;">Original GANs</span></a></li>
<li><a style="color: grey;" href="#S"><span style="font-family: 黑体; font-size: large;">Solutions to problems of original GAN</span></a></li>
</ul>
<hr />
<p>Generative adversarial networks (GAN) have shown great capacity in different applications. This article will explain the maths of GANs.</p>
<p style="color: black;"><strong><a name="math"></a>Mathematical background</strong></p>
<p style="color: black;">Let us first go through all the mathematical knowledge necessary for understanding GANs.</p>
<p style="color: black;"><strong><a name="math1"></a>Entropy and cross-entropy</strong></p>
<p style="color: black;"><span style="text-decoration: underline;">Entropy (in information theory) is the average number of bits of information we need to know about the even</span>t. if we know a event $A$ will definitely happen, which means $P(A=True)=1$, then, we the entropy is $0$ as we already know the result. Likewise, if the probability of $A$ happening is $p$, then we can say there is "randomness" in this event. The smaller the $p$, the larger the "randomness" and the entropy. The entropy is defined as:</p>
<p style="color: black;">$$H(p) = \sum_{x \in X}-p(x)log_{2}(p(x)) = \mathbb{E}[-log(p(X))]$$</p>
<p style="color: black;">Where $-log_{2}(p(x))$ is the number of bits to know an event.</p>
<p style="color: black;">The entropy of event $A$ is the amount of information we need to know to decrease the uncertainty to $0$. However, $H(p)$ usually represents the best scenario. For example, if a new traveller wants to walk from the Delft train station to the TU Delft campus, he or she may have many options. If he randomly chooses one option, this option is highly likely not the shortest way to go, which means that in reality, we usually need more bits of information $H(q,p)$ than $H(p)$. $H(q,p)$ is essentially cross-entropy. The cross-entropy is defined as:</p>
<p style="color: black;">$$H(p,q)=\sum_{x \in X}-p(x)log_{s}(q(x))=\mathbb{E}_{x \sim p(X)}[-log(q(X))]$$</p>
<p style="color: black;">Where $p(x)$ represents a real distribution and $q(x)$ represents the distribution we want to use to estimate the real distribution. The cross-entropy is always larger than entropy unless $p(x)=q(x)$</p>
<p style="color: black;"><strong><a name="math2"></a>Kullback&ndash;Leibler divergence</strong></p>
<p style="color: black;">Kullback&ndash;Leibler divergence (KL divergence) measures the "distance" between the cross-entropy and entropy. KL divergence is defined as:</p>
<p style="color: black;">$$ \begin{align*} D_{KL}(P||Q)=H(P,Q)-H(P) &amp;=\sum_{x \in X}-p(x)log_{s}(q(x))- \sum_{x \in X}-p(x)log_{2}(p(x))\\ &amp;= \sum_{x \in X}p(x)log_{2}(\frac{p(x)}{q(x)})&nbsp; \end{align*}$$</p>
<p style="color: black;">Where $D_{KL}(P||Q)$ is KL divergence, $P, Q$ represent the real distribution and unreal distribution, respectively. By subtracting H(Q) from H(P||Q), KL divergence kind finds the "extra information" needed if we apply $Q$ which is not the real distribution.</p>
<p style="color: black;">Note: KL divergence is not asymmetry, which means $D_{KL}(P||Q) \neq D_{KL}(Q||P)$</p>
<p style="color: black;"><strong><a name="math3"></a>Jensen&ndash;Shannon divergence</strong></p>
<p style="color: black;">Jensen&ndash;Shannon divergence (JS divergence) is similar to KL divergence and is another way to measure the difference between two distributions. JS divergence is defined as:</p>
<p style="color: black;">$$\begin{align*}</p>
<p style="color: black;">JSD(P||Q)=\frac{1}{2}D_{KL}(P||\frac{P+Q}{2})+\frac{1}{2}D_{KL}(Q||\frac{P+Q}{2}) &amp;=\frac{1}{2}[\sum p(x)log_{2}\frac{2p(x)}{p(x)+q(x)}+\sum p(x)log_{2}\frac{2p(x)}{p(x)+q(x)}] &amp;=\frac{1}{2}[\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}+\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}]+log_{2}2</p>
<p style="color: black;">\end{align*}$$</p>
<p style="color: black;">Note: JS divergence is asymmetry, which means $D_{KL}(P||Q) = D_{KL}(Q||P)$</p>
<p style="color: black;"><strong><a name="math4"></a>Manifold (not necessary)</strong></p>
<p style="color: black;">In mathematics, a manifold is a topological space that locally resembles Euclidean space near each point. More precisely, an n-dimensional manifold, or n-manifold for short, is a topological space with the property that each point has a neighbourhood that is homeomorphic to an open subset of n-dimensional Euclidean space.</p>
<p style="color: black;">When we describe a circle or a sphere in the cartesian coordinate system, we realize that we need many points to describe these objects, which looks redundant. Could we find a way to save our "energy"? for example, when we describe a circle, we need two dimensions, which are (x,y). however, if we use polar coordinates to describe a circle or sphere, we only need one dimension which is the radius.&nbsp; Later, we will discuss that the data we used to train GANs can be considered as manifolds of a high-dimension object in a low-dimension, which, consequently, lead to a problem in training.</p>
<p style="color: black;">&nbsp;</p>
<p style="color: black;">&nbsp;</p>
<p style="color: black;">&nbsp;</p>