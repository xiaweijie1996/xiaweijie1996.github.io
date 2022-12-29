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
<li><span style="color: grey;"><a href="#math"><font face="黑体" size=4>Mathematical background</font></a><span></li>
<ul>
	<li><span style="color: black;"><a href="#math1"><font face="黑体" size=4>Entropy</font></a><span></li>
	<li><span style="color: black;"><a href="#math2"><font face="黑体" size=4>Cross entropy</font></a><span></li>
	<li><span style="color: black;"><a href="#math3"><font face="黑体" size=4>Kullback–Leibler divergence</font></a><span></li>
	<li><span style="color: black;"><a href="#math4"><font face="黑体" size=4>Jensen–Shannon divergence</font></a><span></li>

</ul>
<li><p style="color: black"><font face="黑体" size=4><a href="#GAN">Original GANs</font></a><p></li>
<li><p style="color: black"><font face="黑体" size=4><a href="#GAN">Original GANs</font></a><P></li>
<li><p style="color: black"><font face="黑体" size=4><a href="#S">Solutions to problems of original GAN</font></a><P></li>
</ul>

<p>Generative adversarial networks (GAN) has shown great capacity to be a generative model, this articles will explain the maths of GANs.</p>

<table border="1">
    <tr>
        <td><font face="黑体" size=4><b>Content</b></font></td>
    </tr>

    <tr>
        <td>

	<p style="color: black"><a href="#math"><font face="黑体" size=4>Mathematical background</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Entropy</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math2"><font face="黑体" size=4>Cross entropy</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math3"><font face="黑体" size=4>Kullback–Leibler divergence</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math4"><font face="黑体" size=4>Jensen–Shannon divergence</font></a><p>

	</td>
    </tr>

    <tr>
        <td>

	<p style="color: black"><font face="黑体" size=4><a href="#GAN">Original GANs</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#GAN1"><font face="黑体" size=4>Problems of original GAN</font></a><p>

	</td>
    </tr>

    <tr>	
	<td>

	<p style="color: black"><font face="黑体" size=4><a href="#S">Solutions to problems of original GAN</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#Sgit1"><font face="黑体" size=4>Wasserstein GAN</font></a><p>
	
	</td>
    </tr>
  
</table>

<p style="color: black"><a name="math">Mathematical background</a><p>


