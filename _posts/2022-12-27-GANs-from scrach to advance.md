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

<p>Generative adversarial networks (GAN) has shown great capacity to be a generative model, this articles will explain the maths of GANs.</p>

<table  style="border-collapse: collapse; width: 100%;" border="1">
    <tr>
        <td><font face="黑体" size=4><b>Content</b></font></td>
    </tr>

    <tr>
        <td>

	<p style="color: black"><a href="#math"><font face="黑体" size=4>Mathematical background</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Entropy</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Cross entropy</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Kullback–Leibler divergence</font></a><p>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Jensen–Shannon divergence</font></a><p>
add .
	</td>
    </tr>

    <tr>
        <td>

	<p style="color: black"><font face="黑体" size=4><a href="#anhui">Original GANs</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Problems of original GAN</font></a><p>

	</td>
    </tr>

    <tr>	
	<td>

	<p style="color: black"><font face="黑体" size=4><a href="#anhui">Solutions to problems of original GAN</font></a><P>
	<p style="padding-left: 40px;color: black"><a href="#math1"><font face="黑体" size=4>Wasserstein GAN</font></a><p>
	
	</td>
    </tr>
  
</table>


<p style="color: black"><a name="math">Mathematical background</a><p>

<div>Gan</div>
