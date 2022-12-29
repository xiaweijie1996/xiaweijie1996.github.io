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

<font face="黑体" size=4><b>Content</b></font>
<ul>
<li><a style="color: grey;" href="#math"><font face="黑体" size=4>Mathematical background</font></a></li>
<ul>
<li><a style="color: grey;" href="#math1"><font face="黑体" size=4>Entropy</font></a></li>
<li><a style="color: grey;" href="#math2"><font face="黑体" size=4>Cross entropy</font></a></li>
<li><a style="color: grey;" href="#math3"><font face="黑体" size=4>Kullback–Leibler divergence</font></a></li>
<li><a style="color: grey;" href="#math4"><font face="黑体" size=4>Jensen–Shannon divergence</font></a></li>
</ul>
<li><a style="color: grey;" href="#GAN"><font face="黑体" size=4>Original GANs</font></a></li>
<li><a style="color: grey;" href="#GAN"><font face="黑体" size=4>Original GANs</font></a></li>
<li><a style="color: grey;" href="#S"><font face="黑体" size=4>Solutions to problems of original GAN</font></a></li>
</ul>

<p>Generative adversarial networks (GAN) has shown great capacity to be a generative model, this articles will explain the maths of GANs.</p>

<p style="color: black"><a name="math">Mathematical background</a><p>


