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
<li><a style="color: grey;" href="#math3"><span style="font-family: 黑体; font-size: large;">Kullback&ndash;Leibler divergence</span></a></li>
<li><a style="color: grey;" href="#math4"><span style="font-family: 黑体; font-size: large;">Jensen&ndash;Shannon divergence</span></a></li>
</ul>
</li>
<li><a style="color: grey;" href="#GAN"><span style="font-family: 黑体; font-size: large;">Original GANs</span></a></li>
<li><a style="color: grey;" href="#S"><span style="font-family: 黑体; font-size: large;">Solutions to problems of original GAN</span></a></li>
</ul>
<p>Generative adversarial networks (GAN) have shown great capacity in different applications. This article will explain the maths of GANs.</p>
<p style="color: black;"><strong><a name="math"></a>Mathematical background</strong></p>
<p style="color: black;">Let us first go through all the mathematical knowledge necessary for understanding GANs.</p>
<p style="color: black;"><strong><a name="math1"></a>Entropy and cross-entropy</strong></p>
<p style="color: black;">Entropy (in information theory) is the average number of bits of information we need to know about the event. if we know a event $A$ will definitely happen, which means $P(A=True)=1$, then, we the entropy is $0$ as we already know the result. Likewise, if the probability of $A$ happening is $p$, then we can say there is "randomness or chaos" in this event. The smaller the $p$, the larger the "randomness" and the entropy. The entropy is defined:</p>
$$H(S) = \sum_{x \in X}-p(x)log(p(x))$$
<p style="color: black;">where $-log(p(x))$ is the number of bits to know an event.</p>