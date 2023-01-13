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


<p>Generative adversarial networks (GANs) have shown great capacity in different applications. Compared with other generative models like VAE, Flow-based models, GANs usually show the highest quality in generated results. This article will discuss the maths behind the GANs and will try to describe the development of GANs technique from original algorithms to the most advanced algorithms.</p>
<p>Until now, there are more than 400 types of GANs which you can find in <a href="https://github.com/hindupuravinash/the-gan-zoo">GAN ZOO</a>.</p>
<hr />
<p><strong>Content</strong></p>

<ul>
<li><a style="color: grey;" href="#math"><span style="font-family: 黑体; font-size: large;">Mathematical background</span></a>
<ul>
<li><a style="color: grey;" href="#math1"><span style="font-family: 黑体; font-size: large;">Entropy and cross-entropy</span></a></li>
<li><a style="color: grey;" href="#math2"><span style="font-family: 黑体; font-size: large;">Kullback&ndash;Leibler divergence</span></a></li>
<li><a style="color: grey;" href="#math3"><span style="font-family: 黑体; font-size: large;">Jensen&ndash;Shannon divergence</span></a></li>
<li><a style="color: grey;" href="#math4"><span style="font-family: 黑体; font-size: large;">Manifold</span></a></li>
</ul>
</li>
<li><a style="color: grey;" href="#GAN"><span style="font-family: 黑体; font-size: large;">Original GANs</span></a>
<ul>
<li><a style="color: grey;" href="#GAN1"><span style="font-family: 黑体; font-size: large;">Maximum likelihood estimation of generator</span></a></li>
<li><a style="color: grey;" href="#GAN2"><span style="font-family: 黑体; font-size: large;">JS divergence in the discriminator</span></a></li>
<li><a style="color: grey;" href="#GAN3"><span style="font-family: 黑体; font-size: large;">Problem with JS and KL divergence</span></a></li>
</ul>
</li>
<li><a style="color: grey;" href="#S"><span style="font-family: 黑体; font-size: large;">Solutions to problems of original GAN</span></a>
<ul>
<li><a style="color: grey;" href="#S1"><span style="font-family: 黑体; font-size: large;">fGAN</span></a></li>
<li><a style="color: grey;" href="#S2"><span style="font-family: 黑体; font-size: large;">Wasserstein GAN</span></a></li>
<li><a style="color: grey;" href="#S3"><span style="font-family: 黑体; font-size: large;">Other solutions</span></a></li>
</ul>
</li>
<li><a style="color: grey;" href="#O"><span style="font-family: 黑体; font-size: large;">Other types of GANs</span></a></li>
</ul>

<p>&nbsp;</p>
<p style="color: black;"><strong><a name="math"></a>Mathematical background</strong></p>
<p style="color: black;">Let us first go through all the mathematical knowledge necessary for understanding GANs.</p>
<p style="color: black;"><strong><a name="math1"></a>Entropy and cross-entropy</strong></p>
<p style="color: black;"><span style="text-decoration: underline;">Entropy (in information theory) is the average number of bits of information we need to know about the even</span>t. if we know a event $A$ will definitely happen, which means $P(A=True)=1$, then, we the entropy is $0$ as we already know the result. Likewise, if the probability of $A$ happening is $p$, then we can say there is "randomness" in this event. The smaller the $p$, the larger the "randomness" and the entropy. The entropy is defined as:</p>
<p style="color: black;">$$H(p) = \sum_{x \in X}-p(x)log_{2}(p(x)) = \mathbb{E}[-log(p(X))]$$</p>
<p style="color: black;">Where $-log_{2}(p(x))$ is the number of bits to know an event.</p>
<p style="color: black;">The entropy of event $A$ is the amount of information we need to know to decrease the uncertainty to $0$. However, $H(p)$ usually represents the best scenario. For example, if a new traveller wants to walk from the Delft train station to the TU Delft campus, he or she may have many options. If he randomly chooses one option, this option is highly likely not the shortest way to go, which means that in reality, we usually need more bits of information $H(q,p)$ than $H(p)$. $H(q,p)$ is essentially cross-entropy. The cross-entropy is defined as:</p>
<p style="color: black;">$$H(p,q)=\sum_{x \in X}-p(x)log_{s}(q(x))=\mathbb{E}_{x \sim p(X)}[-log(q(X))]$$</p>
<p style="color: black;">Where $p(x)$ represents a real distribution and $q(x)$ represents the distribution we want to use to estimate the real distribution. The cross-entropy is always larger than entropy unless $p(x)=q(x)$.</p>
<p style="color: black;"><strong><a name="math2"></a>Kullback&ndash;Leibler divergence</strong></p>
<p style="color: black;">Kullback&ndash;Leibler divergence (KL divergence) measures the "distance" between the cross-entropy and entropy. KL divergence is defined as:</p>
<p style="color: black;">$$ \begin{align*} D_{KL}(P||Q) &amp;=H(P,Q)-H(P) \\ &amp;=\sum_{x \in X}-p(x)log_{s}(q(x))- \sum_{x \in X}-p(x)log_{2}(p(x))\\ &amp;= \sum_{x \in X}p(x)log_{2}(\frac{p(x)}{q(x)})&nbsp; \end{align*}$$</p>
<p style="color: black;">Where $D_{KL}(P||Q)$ is KL divergence, $P, Q$ represent the real distribution and unreal distribution, respectively. By subtracting H(Q) from H(P||Q), KL divergence kind finds the "extra information" needed if we apply $Q$ which is not the real distribution.</p>
<p style="color: black;">Note: KL divergence is not asymmetry, which means $D_{KL}(P||Q) \neq D_{KL}(Q||P)$</p>
<p style="color: black;"><strong><a name="math3"></a>Jensen&ndash;Shannon divergence</strong></p>
<p style="color: black;">Jensen&ndash;Shannon divergence (JS divergence) is similar to KL divergence and is another way to measure the difference between two distributions. JS divergence is defined as:</p>
<p style="color: black;">$$\begin{align*} JSD(P||Q)&amp;=\frac{1}{2}D_{KL}(P||\frac{P+Q}{2})+\frac{1}{2}D_{KL}(Q||\frac{P+Q}{2}) \\ &amp;=\frac{1}{2}[\sum p(x)log_{2}\frac{2p(x)}{p(x)+q(x)}+\sum p(x)log_{2}\frac{2p(x)}{p(x)+q(x)}] \\ &amp;=\frac{1}{2}[\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}+\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}]+log_{2}2 \end{align*}$$</p>
<p style="color: black;">Note: JS divergence is asymmetry, which means $JSD(P||Q) = JSD(Q||P)$</p>
<p style="color: black;"><strong><a name="math4"></a>Manifold (not necessary)</strong></p>
<p style="color: black;">In mathematics, a manifold is a topological space that locally resembles Euclidean space near each point. More precisely, an n-dimensional manifold, or n-manifold for short, is a topological space with the property that each point has a neighbourhood that is homeomorphic to an open subset of n-dimensional Euclidean space.</p>
<p style="color: black;">When we describe a circle or a sphere in the cartesian coordinate system, we realize that we need many points to describe these objects, which looks redundant. Could we find a way to save our "energy"? for example, when we describe a circle, we need two dimensions, which are (x,y). however, if we use polar coordinates to describe a circle or sphere, we only need one dimension which is the radius.&nbsp; Later, we will discuss that the data we used to train GANs can be considered as manifolds of a high-dimension object in a low-dimension, which, consequently, leads to a problem in training.</p>


<p style="color: black;"><strong><a name="GAN"></a>Original GANs</strong></p>
<p style="color: black;">Basic GANs consist of two components:</p>
<p style="color: black;">1- Generator $G$, which is responsible for generating data.</p>
<p style="color: black;">2- Discriminator $D$, which is responsible for grading the generated data.</p>
<p style="color: black;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://sthalles.github.io/assets/dcgan/GANs.png" alt="Structure of GANs" width="512" height="223" /></p>
<p style="color: black; text-align: center;"><span style="color: #808080;">Fig. 1 Structure of GANs</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">In the training process, $G$ and $D$ will compete with each other and reduce the loss which is defined as:</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">$$ \begin{align*}&nbsp; \min_{G}\max_{D} L(G,D) &amp;= \frac{1}{N}\sum log(D(x))+\frac{1}{N}\sum log (1-D(G(z))) \\ &amp;= \mathbb{E}_{x \sim p_{real}(x)}[log(D(x))]+\mathbb{E}_{z \sim p_{z}(z)}[log(1-D(G(Z)))] \\ &amp;= \mathbb{E}_{x \sim p_{real}(x)}[log(D(x))]+\mathbb{E}_{x \sim p_{gen}(x)}[log(1-D(x)] \end{align*}$$</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">Where $z$ is the noise of a specific distribution (eg, unique distribution, normal distribution). $N$ is the number of samples, $p_{real}(x)$ is the real distribution of the data, $p_{gen}(x)$ is the distribution of generated data.</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="GAN1"></a>Maximum likelihood estimation of generator</strong></span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">Given a real distribution $p_{real}(x)$, we have generated distribution $p_{gen}(x; \theta)$, $\theta$ are parameters of generator. What we want is to make $p_{gen}(x; theta)$ as close to $p_{real}(x)$ as possible.&nbsp;</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">Assuming we sample ${x_1,x_2,...,x_n}$ data from the read distribution. Then, the likelihood of generating the same samples by the generator is:</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">$$p=\prod \limits_{i=1}^n p(x_i; \theta)$$</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">And now, if we want to find the best generator, we need to find $\theta^*$ which maximises the likelihood.</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">$$ \begin{align*} \theta^* &amp;= arg\max_{\theta}\prod \limits_{i=1}^n p(x_i; \theta)\\&amp;=arg \max_{\theta} log(\prod \limits_{i=1}^n p(x_i; \theta))\\ &amp;=arg \max_{\theta} \sum_{i=1}^{n}log(p(x_i; \theta))\\ &amp;\approx arg\max_{\theta} \mathbb{E}_{x \sim p_{real}(x)}[log(p(x_i;\theta))]&nbsp; \end{align*}$$</span></p>
<p style="color: black; text-align: left;">For the derivation of the last step, if you randomly pick $M$ samples from $N$ samples, we have similar expectations, that is:</p>
<p style="color: black; text-align: left;">$$\frac{1}{M} \sum_{i=1}^M f(x_i) \approx \frac{1}{N} \sum_{j=1}^N f(x_j) $$</p>
<p style="color: black; text-align: left;">Let us continue our derivation:&nbsp;</p>
<p style="color: black; text-align: left;">$$\begin{align*} arg\max_{\theta} \mathbb{E}_{x \sim p_{real}(x)}[log(p(x_i;\theta)] &amp;= arg\max_{\theta} \int_{x}p_{real}(x)log(p(x_i;\theta)dx\\ &amp;= arg\max_{\theta} \int_{x}p_{real}(x)log(p(x_i;\theta)dx- \underbrace{\int_x p_{real}(x)log(p_{real}(x))dx}_{constant}\\ &amp;= arg\min_{\theta} D_{KL}(p_{real}(x)||p_{gen}(x; \theta)) \end{align*}$$</p>
<p style="color: black; text-align: left;">This means the generator $G$ is essentially minimizing the KL divergence of the real distribution and distribution of generated data. The best $\theta$ is the $\theta$ which leds to the lowest KL divergence.</p>
<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="GAN2"></a>JS divergence in the discriminator</strong></span></p>
<p style="color: black; text-align: left;">we now know that the $G$ is trying to minminze the KL divergence, let us also take a deeper look at $D$. The objective of $G$ is to maximize the $L(G,D)$.</p>
<p style="color: black; text-align: left;">$$\begin{align*} L(G,D)&amp;=\mathbb{E}_{x \sim p_{real}(x)}[log(x)]+\mathbb{E}_{x \sim p_{gen}(x)}[log(1-D(x)] \\ &amp;= \int_{x}p_{real}(x)log(D(x))dx+\int_{x}p_{gen}(x)log(1-D(x))dx\\ &amp;= \int_{x}\underbrace{[p_{real}(x)log(D(x))+p_{gen}(x)log(1-D(x))]}_{f(D)}dx \end{align*}$$</p>
<p style="color: black; text-align: left;">Because if $f(x)&gt;g(x)$, we can get $\int f(x) &gt; \int g(x)$, so, optimize $L(G,D)$ is essentially optimize $f(D)$.</p>
<p style="color: black; text-align: left;">$$f(D)=p_{real}(x)log(D)+p_{gen}(x)log(1-D)$$</p>
<p style="color: black; text-align: left;">To find $D^*$ which maximize $f(D)$:</p>
<p style="color: black; text-align: left;">$$\frac{df(D)}{dD}=0 $$</p>
<p style="color: black; text-align: left;">$$\Rightarrow p_{real}(x)&times;\frac{1}{D}-p_{gen}(x)\frac{1}{1-D}=0 $$</p>
<p style="color: black; text-align: left;">$$\Rightarrow D^*=\frac{p_{real}(x)}{p_{real}(x)+p_{gen}(x)}, (0&lt;D^*&lt;1) $$</p>
<p style="color: black; text-align: left;">Substitute $D^*$ into $L(G,D)$:</p>
<p style="color: black; text-align: left;">$$\begin{align*}L(G,D) &amp;=\int_{x}p_{real}(x)log(D(x))dx+\int_{x}p_{gen}(x)log(1-D(x))dx \\ &amp;=\int_{x}p_{real}(x)log[\frac{p_{real}(x)}{p_{real}(x)+p_{gen}(x)}]dx+\int_{x}p_{gen}(x)log[1-\frac{p_{real}(x)}{p_{real}(x)+p_{gen}(x)}]dx \\ &amp;=-2log2+D_{KL}(p_{real}(x)||\frac{p_{real}(x)}{p_{real}(x)+p_{gen}(x)})+D_{KL}(p_{gen}(x)||\frac{p_{real}(x)}{p_{real}(x)+p_{gen}(x)})\\ &amp;=-2log2+2JSD(p_{real}(x)||p_{gen}(x))\end{align*}$$</p>
<p style="color: black; text-align: left;">Utill now we realize that the $D$ is trying to maximize the JS divergence.</p>


<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="GAN3"></a>Problem with JS and KL divergence</strong></span></p>
<p style="color: black; text-align: left;">Maybe, you already realized that the maximum value of KL divergence is 1, which means when two distribution is "very very different" and "very different", the KL divergence is always approximately equal to 1. The gradient will disappear, which makes the algorithm not work.</p>
<p style="color: black; text-align: left;">Same to JS divergence, when two distributions are "very very different" and "very different", or more explicitly, when two distributions do not overlap, The gradient will disappear.</p>
<p style="color: black; text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://img-blog.csdnimg.cn/20200501154147675.png" alt="" width="569" height="213" /></p>
<p style="color: black; text-align: center;"><span style="color: #808080;">Fig2. Two distributions without overlap</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">From the figure above when $x&gt;5, p_{r}(x) \approx 0$, when $x&lt;5, p_{g}(x) \approx 0$, then for $x \in \mathbb{R}$ JS divergence is:</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">$$\underbrace{\frac{1}{2}[\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}+\sum p(x)log_{2}\frac{p(x)}{p(x)+q(x)}]}_{ 0 \ for \ x \in \mathbb{R} }+log_{2}2=log_{2}2$$</span></p>
<p style="color: black; text-align: left;">The problems of KL and JS divergence make GANs hard to train. There are two ways to understand why this problem happens:</p>
<p style="color: black; text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.math.net/img/a/geometry/planes/intersecting-planes/intersecting-planes.png" alt="" /></p>
<p style="color: black; text-align: center;"><span style="color: #808080;">Fig3. Overlap of p and q in 3D space can be ignored</span></p>
<p style="color: black; text-align: left;">&nbsp;<strong>1-</strong> Both $p_{real}(x), p_{gen}(x)$ can be considered to lie in the low dimensional manifolds, which means this is no overlap or the overlap can be ignored. Fig 3 shows what it looks like.</p>
<p style="color: black; text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.postimg.cc/15g2L6w6/We-Chat-Image-20221231003840.jpg" alt="" width="220" height="141" /></p>
<p style="color: black; text-align: center;"><span style="color: #808080;">Fig4. Theoretical overlap of two distributions</span></p>
<p style="color: black; text-align: left;"><strong>2- </strong>Even though two distributions might overlap theoretically, in reality, we can only sample a limited amount of data. In this case, the sampled data might not overlap, as Fig3 shows.</p>

<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="S"></a>Solutions to problems of original GAN</strong></span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;">In this section, we will discuss the solutions to the problems mentioned above.</span></p>
<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="S1"></a>f-GAN</strong></span></p>
<p style="color: black; text-align: left;">The definition of f-divergence is:</p>
<p>$$D_f(P||Q)=\int_{x}q(x)f(\frac{p(x)}{q(x)})dx$$</p>
<p style="color: black; text-align: left;">The following conditions have to be satisfied:</p>
<ul>
<li>$f$ is convex</li>
<li>$f(1)=0$</li>
</ul>
<p>Based on this definition, if $f(x)=xlogx$, the f-divergence is KL divergence.</p>
<p>Every convex function has its conjugate function $f^*$ ($(f^*)^*=f$):</p>
<p>$$f^*(t)= \max_{x \in dom(f)} {xt-f(x)}$$</p>
<p>where dom(f) is the domain of $f$. Then I can get an equivalent formula：</p>
<p>$$f^*(t)= \max_{x \in dom(f)} (xt-f(x)) \Leftrightarrow f(x)= \max_{t \in dom(f^*)} (xt-f^*(t)) $$</p>
<p>$$\begin{align*} D_f(P||Q) &amp;=\int_{x}q(x)f(\frac{p(x)}{q(x)})dx \\ &amp;= \int_{x} q(x) [\max_{t \in dom(f^*)}(\frac{p(x)}{d(x)}t-f^*(t))]dx \end{align*}$$</p>
<p>Because:</p>
<p>$$\begin{align*} D_f(P||Q) &amp;\geq \int_{x} q(x)(\frac{p(x)}{d(x)}D(x)-f(D(x)))dx \\ &amp;= \int_{x} p(x)D(x)dx-\int_{x}q(x)f^*(D(x))dx \end{align*}$$</p>
<p>Then:$$\begin{align*} D_f(P||Q) &amp;\approx \max_{D} \int_{x} p(x)D(x)dx-\int_{x}q(x)f^*(D(x))dx \\ &amp;= \max_{D} {\mathbb{E}_{x \in P}[D(x)]-\mathbb{E}_{x \in Q}[f^*(D(x))] } \end{align*}$$</p>
<p>Table below summarize the $f^*$ that can be used:</p>
<p><img src="https://i.postimg.cc/PxHfwP6c/We-Chat-Image-20230111191250.jpg" alt="" /></p>
<p style="color: black; text-align: left;"><span style="color: #000000;"><strong><a name="S2"></a>Wasserstein GAN</strong></span></p>
To understand WGAN, we need first to understand Wasserstein distance, also known as Earth moving distance. Let $\mathcal{X}$ be a compact metric set, say the space of images $[0, 1]^d$, and let $\Sigma$ denote the set of all the Borel subsets of $\mathcal{X}$. Let $Prob(\mathcal{X})$ denote the space of probability measures defined on $\mathcal{X}$. We can now define elementary distances and divergences between two distributions $\mathbb{P}_r, \mathbb{P}_g \in Prob(\mathcal{X})$:  
<ul>
<li>Total variation distance: $$\delte (\mathbb{P}_r, \mathbb{P}_g)=\sup_{A \in \Sigma}(\mathbb{P}_r(A)-\mathbb{P}_g(A)$$</li>
<li>KL distance:$$D_{KL}(\mathbb{P}_r||\mathbb{P}_g)=\int_{x} \frac{\mathbb{P}_r(x)}{\mathbb{P}_g(x)}\mathbb{P}_r(x)d\mu (x)$$</li>
<li>JS distance: $$JS(\mathbb{P}_r||\mathbb{P}_g)=D_{KL}(\mathbb{P}_r||\mathbb{P}_m)+\mathbb{P}_m||\mathbb{P}_g)$$</li>
<li>Earth Moving distance: $$W(\mathbb{P}_r, \mathbb{P}_g)=\inf_{\gamma \in \prod(\mathbb{P}_r||\mathbb{P}_g)} \mathbb{E}_{(x,y) \sim \gamma}[||x-y||]$$&nbsp; where $\prod(\mathbb{P}_r||\mathbb{P}_g)}$ is the set of all joint distributions $\gamma (x, y)$ whose marginals are respectively $\mathbb{P}_r$ and $\mathbb{P}_g$. Intuitively, $\gamma (x, y)$ indicates how much &ldquo;mass&rdquo; must be transported from $x$ to $y$ in order to transform the distributions $\mathbb{P}_r$ into the distribution $\mathbb{P}_g$.</li>
</ul>

Updata soon