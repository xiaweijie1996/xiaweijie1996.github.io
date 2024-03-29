---
title: A small review of transfer learning-domain adaptation
categories:
- Machine Learning
feature_image: "https://i.postimg.cc/9F4wK2S2/wallhaven-1pd1o9.jpg"
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

<p>&nbsp;</p>
<p>Recently, some transfer learning models are needed for some of my scientific research. Here is a technical review note, which can be used by those in need. All suggestions and discussions are welcome.</p>
<p>Reference list:</p>
<ul>
<li data-pid="vjrPjHPC">Thrun, Sebastian. "Is learning the n-th thing any easier than learning the first?."<em>Advances in neural information processing systems</em>8 (1995).</li>
<li data-pid="zuoDhNbl">Daum&eacute; III, Hal. "Frustratingly easy domain adaptation."<em>arXiv preprint arXiv:0907.1815</em>(2009).</li>
<li data-pid="qMCvnA8h">Pan, Sinno Jialin, James T. Kwok, and Qiang Yang. "Transfer learning via dimensionality reduction."<em>AAAI</em>. Vol. 8. 2008.</li>
<li data-pid="wOGYiDHM">Pan, S. J., Tsang, I. W., Kwok, J. T., &amp; Yang, Q. (2011). Domain Adaptation via Transfer Component Analysis. IEEE Transactions on Neural Networks.</li>
<li data-pid="1rSNWgzv">Ghifary, Muhammad, W. Bastiaan Kleijn, and Mengjie Zhang. "Domain adaptive neural networks for object recognition."<em>PRICAI 2014: Trends in Artificial Intelligence: 13th Pacific Rim International Conference on Artificial Intelligence, Gold Coast, QLD, Australia, December 1-5, 2014. Proceedings 13</em>. Springer International Publishing, 2014.</li>
<li data-pid="e2LzKKaO">Ganin, Yaroslav, and Victor Lempitsky. "Unsupervised domain adaptation by backpropagation."<em>International conference on machine learning</em>. PMLR, 2015.</li>
<li data-pid="bGIWgt4u">Zhuang, Fuzhen, et al. "Supervised representation learning: Transfer learning with deep autoencoders."<em>Twenty-fourth international joint conference on artificial intelligence</em>. 2015.</li>
<li data-pid="xJkWHQAX">Long, Mingsheng, et al. "Learning transferable features with deep adaptation networks."<em>International conference on machine learning</em>. PMLR, 2015.</li>
<li data-pid="Cj-TpyT6">Tzeng, Eric, et al. "Adversarial discriminative domain adaptation."<em>Proceedings of the IEEE conference on computer vision and pattern recognition</em>. 2017.</li>
<li data-pid="86uq0eMi">Zhuang, Fuzhen, et al. "A comprehensive survey on transfer learning."<em>Proceedings of the IEEE</em>109.1 (2020): 43-76</li>
</ul>
<p>&nbsp;</p>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3);" size="3" width="80%" />
<div class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
<div class="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto">
<div class="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
<div class="flex flex-grow flex-col gap-3">&nbsp;</div>
</div>
</div>
</div>
<div class="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
<div class="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto">
<div class="flex-shrink-0 flex flex-col relative items-end">
<div class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">&nbsp;</div>
<div class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
<h3><strong>Thrun, Sebastian. "Is learning the n-th thing any easier than learning the first?."<em>Advances in neural information processing systems</em>8 (1995).</strong></h3>
</div>
</div>
<div class="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
<div class="flex flex-grow flex-col gap-3">
<div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
<div class="markdown prose w-full break-words dark:prose-invert light">
<p><strong>Basic Concepts </strong></p>
<p>paper 1 proposes that compared to supervised learning, the human brain actually has other learning mechanisms, that is, "the process of the human brain learning a concept not only uses concept-related training datasets but also uses data that already have relevant concepts (humans often employ more than just the training data for generalization)". An example is given in the paper for a concept learning task (which can be understood as a classification task perhaps more directly). Let function $f \in \left\{f_1, f_2,f_3,.. ,f_{n-1}\right\}$ be an indicator function $f:I \rightarrow \left\{0,1 \right\}$, where $f_k$ represents a classifier of a certain item $k$, and for any $x \in I_k$, $f(x)=1$, and for $x \notin I_k$, $f_k(x)=0$. $X_k$ $(k=1,2,..,n-1)$ contains all the data sets $\left\langle x,f_k(x)\right\rangle$ of the first $n-1$ concepts (items). Therefore, a transfer learning task can be understood as when learning a new classifier $f_n$, you will not only use the dataset directly related to concept (item) $n$, but also use $X_k$ as an auxiliary data set, so $X_k$ is called the support set. The essence of transfer learning is to use the "invariants" in different data distributions. When I learn how to extract the "invariants", these "invariants" can assist new learning behaviors. Memory-based learning methods.</p>
<p><strong>Method 1: k-nearest neighbour.</strong></p>
<p>For the data $\langle x_i,y_i \rangle$, we can find the k-nearest points in $X_k$ to $\langle x_i,y_i \rangle$, and then compute $y_i = \frac{1}{k} \sum_{j=1}^k y_j$ to obtain the value of $y_i$.</p>
<p><strong>Method 2:</strong> Shepard, averaging Y with the distances between $\langle x_i,y_i \rangle$ and all points in $X_k$ as weights to obtain $y_i$.</p>
<p>$S(x_i)=(\sum_{\langle x_i,y_i \rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}) \cdot c$</p>
<p>$c= \sum_{\langle x_i,y_i \rangle \in X} \frac{y_i}{||x-x_i||^2+\epsilon}$</p>
<p>Here, $\epsilon$ is a small constant to prevent division by zero.</p>
<p><strong>Method 3:</strong> Learn a new set of latent variables to represent the original variables.</p>
<p>$E:=\sum_{k=1}^{n-1} \sum_{\langle x,y=1 \rangle \in X_k} (\sum_{\langle x',y'=1\rangle \in X_k}||g(x)-g(x')||-\sum_{\langle x',y'=0 \rangle \in X_k}||g(x)-g(x')|| )$</p>
<p>By minimizing $E$, we hope to find the best mapping $g$ for $x$. Assuming that the new learning task can also be mapped to the latent variables obtained through $g$, we can generate latent variables for the new task data through $g$ and obtain better results using Method 1 and Method 2.</p>
<p><strong>Method 4:</strong> Learn a distance function.</p>
<p>We want to learn a distance function $d$ that satisfies:</p>
<p>$d(x,x')=1$, if $y = y'=1$</p>
<p>$d(x,x')=0$, if $y \neq y'$</p>
<p>There are many ways to learn this distance function, and the paper uses a neural network method. Once we obtain $d$, we can obtain the classification result using the following formula.</p>
<p>$prob(f_n(x)=1)=1-(1+\prod_{\langle x',y'=1\rangle \in X_k}\frac{d(x,x')}{1-d(x,x')})$</p>
</div>
<p><strong>Neural network-based methods:</strong></p>
<p>The memory-based learning method described above (Method 3) only considers $X_k$ and does not consider the data for problem $n$. However, a neural network can be trained to simultaneously reduce $X_k$ and the data for problem $n$.</p>
<p>&nbsp;</p>
<h3><strong>Daum&eacute; III, Hal. "Frustratingly easy domain adaptation."<em>arXiv preprint arXiv:0907.1815</em>(2009).</strong></h3>
<p>&nbsp;</p>
<p><strong>Basic Concepts</strong></p>
<p>paper 2 proposes a very simple method of data augmentation. For the source domain and the target domain, their features can be divided into three parts: "common features," "source-specific features," and "target-specific features." The source domain consists of "common features" and "source-specific features," while the target domain consists of "common features" and "target-specific features." The source domain mapping function $\Phi_s$ and the target domain mapping function $\Phi_t$ are defined as:</p>
<p>$\Phi_s(x)= \left\langle \mathbf{x},\mathbf{x},\mathbf{0}\right\rangle$</p>
<p>$\Phi_t(x)= \left\langle \mathbf{x},\mathbf{0},\mathbf{x} \right\rangle$</p>
<p><strong>Kernelization</strong></p>
<p>The above method can also be kernelized with a kernel function $K$ (which is positive semi-definite):</p>
<p>$\Phi_s(x)= \left\langle\Phi(\mathbf{x}),\Phi(\mathbf{x}),\mathbf{0}\right\rangle$</p>
<p>$\Phi_t(x)= \left\langle \Phi(\mathbf{x}),\mathbf{0},\Phi(\mathbf{x}) \right\rangle$</p>
<p>The paper gives an example of using the linear kernel function $K=\left\langle \Phi (x), \Phi(x') \right\rangle$:</p>
<p>$$ K=\left\{ \begin{array}{**rcl**} 2K(x,x')\ ,\ same.domain&amp; \\ K(x,x')\ \ , diff.domain &amp;\\ \end{array} \right.$$</p>
<h3>&nbsp;</h3>
<h3>Pan, Sinno Jialin, James T. Kwok, and Qiang Yang. "Transfer learning via dimensionality reduction."AAAI. Vol. 8. 2008.</h3>
<p><strong>basic concept</strong></p>
<p>paper 3 proposes a method to achieve transfer learning through dimensionality reduction. The purpose of the algorithm is to project the source domain data and target domain data into a new space, and hope that 1) the source domain and target domain data in the new space The division is as close as possible (looking for "transferred features") 2) The variance of the division of the data itself is as large as possible (preserving the original information, similar to PCA) 3) Satisfying other limiting conditions. After finding a suitable projection space, other machine learning models can be trained in this space to achieve the purpose of transfer learning.</p>
<p><strong>Maximum mean discrepancy (MMD)</strong></p>
<p>In order to achieve thgie goal "the source domain is as close as possible to the target division", we first need a projection function $\Phi(&middot;):\mathcal{X}\rightarrow \mathcal{H}$ . The new space after projection becomes the Regenerated Kernel Hilbert Space (RKHS).</p>
<p>Then we need a function to measure the distance of $\Phi(X_s), \Phi(X_t)$ after projection. The paper chooses MMD as the distance measure. The empirical estimation formula of MMD in RKHS is:</p>
<p>$$dis(X_s,X_t)=||\frac{1}{n_s}\sum_{i=1}^{n_s} \Phi(x_{i}^s)-\frac{1}{n_t}\sum_{ j=1}^{n_t} \Phi(x_{j}^t)||_{\mathcal{H}}$$</p>
<p>Therefore, the problem turns into finding a minimum $dis(X_s,X_t)$ .</p>
<p>In fact $dis(X_s,X_t)=trace(KL)$</p>
<p>$$K=\left[ \begin{array}{ccc} K_{s,s} &amp;K_{s,t}\\ K_{t,s} &amp; K_{t,t}\\ \end{array} \right ] \in \mathbb{R}^{(m+n)&times;(m+N)}$$</p>
<p>$$L=\left\{ \begin{array}{**rcl**} \frac{1}{n^2_s}\ ,\ x_i,x_j \in X_s&amp; \\ \frac{1}{n^2_t}\ ,\ x_i,x_j \in X_t&amp; \\ \frac{1}{n_tn_s}\ ,\ otherwise&amp; \\ \end{array} \right.$$</p>
<p>From dis to trace If you don't understand the calculation, refer to Teacher Wang: Wang Jindong is not at home: MMD calculation nuclear skill formula derivation</p>
<p>Because $L$ is a fixed constant, the problem of minimizing dis is transformed into a positive semi-definite programming problem: find a $K$ that minimizes dis.</p>
<p>But up to this point, we have only minimized the distance from the source domain to the target domain, and we have not yet achieved the maximum variance of the projected data. How? Add a regular term $trace(K)$ to the original optimization problem to represent the variance of the data (because 0 is the centre point $(x-0)^2=x^2$, see the explanation later). So the optimization problem becomes:</p>
<p>$$\min_{k} \ \ trace(KL)-\lambda trace(K)$$</p>
<p>But this is still not enough, two other constraints are added in the paper 1) The spatial distance after projection is stable $K_{ii}^2+K_{jj}^2-2K_{ij}=d_{ij}^2$ 2 ) The projected data is centered on the origin K\mathbf{1}=\mathbf{0} . In addition, in order to ensure that K exists, according to "If a kernel matrix K can be written as $K = K' + &epsilon;I $, where $&epsilon; &gt; 0 $, $K'$ is position semi-definate and $I$ is the identity matrix, then the kernel function corresponding to $K$ is universal &rdquo; Rewrite $K$ as $K=K'+&epsilon; I $.</p>
<p>The optimization problem eventually becomes:</p>
<p>$$\min_{k'} \ \ trace(K'L)-\lambda trace(K') \\ s.t. {K'}_{ii}^2+{K'}_{jj}^2-2{K '}_{ij}=d_{ij}^2 \\ \, \, \, \, {K'}\mathbf{1}=&epsilon;I$$</p>
<p>A little bit of my own understanding:</p>
<p>1) We hope to find a mapping method $\Phi$ that makes 1) the source domain and the target domain as close as possible 2) the variance after mapping is as large as possible. And the kernel matrix $K$ represents the result of this mapping.</p>
<p>2) The kernel matrix itself can be regarded as a similarity table (inner product) between data points (empirical kernel map).</p>
<p>3) After obtaining $K$ , PCA can be used to achieve dimensionality reduction.</p>
<h3>&nbsp;</h3>
<h3>&nbsp;Pan, S. J., Tsang, I. W., Kwok, J. T., &amp; Yang, Q. (2011). Domain Adaptation via Transfer Component Analysis. IEEE Transactions on Neural Networks.</h3>
<p>paper 4 also adopts the method of MMD in paper 3, and improves the method of MMD. The defect of the original MMD method is that 1) the amount of calculation is large and 2) MMD cannot handle points outside the sample. In paper 4, the author rewrites $K$ as $ K=(KK^{-\frac{1}{2}})(K^{-\frac{1}{2}}K)$ . At the same time, assuming that there is a matrix $W'\in \mathbf{R}^{(n_1+n_2)&times;m}$ that can transform $(KK^{-\frac{1}{2}})$ into an m-dimensional matrix, And $m&lt;&lt;(n_1+n_2) $. Using W' we can get a new kernel matrix $K'$</p>
<p>$$K' = (KK^{-\frac{1}{2}}W')({W'}^TK^{-\frac{1}{2}}K)$$</p>
<p>Let$ K^{-\frac{1}{2}}W'=W$ , then $K'=KWW^TK$</p>
<p>Then the optimization problem turns into $\min_w \, trace(K'L) $. Also considering the need to maximize the variance, the transformed data is $W^TK$ , therefore, the variance of the data is $W^TKHKW$ , and H is a centralization matrix, which functions to make the data of $W^TK$ symmetrical about the center. $H=I_{n_1+n_2}-(\mathbf{1}/n_1+n_2)\mathbf{1}\mathbf{1}^T$ .</p>
<p>Then the optimization problem becomes:</p>
<p>$$\max_{w} \ \ trace(KW^TLWK)+\lambda trace(WW^T) \\ s.t. W^TKHKW=I$$</p>
<p>Among them, I guarantees the variance of the transformed data, and $trace(WW^T)$ is a regular term to control the complexity of $W$.</p>
<p>In Lagrange, the optimization problem can be transformed into:</p>
<p>$$\max_W \ \ trace((W^T(KLK + \lambda I)W)^{&minus;1}W^TKHKW)$$</p>
<h3>&nbsp;</h3>
<h3>Ghifary, Muhammad, W. Bastiaan Kleijn, and Mengjie Zhang. "Domain adaptive neural networks for object recognition." PRICAI 2014: Trends in Artificial Intelligence: 13th Pacific Rim International Conference on Artificial Intelligence, Gold Coast, QLD, Aust ralia, December 1-5, 2014. Proceedings 13. Springer International Publishing, 2014.</h3>
<p>paper 5 realizes domain adaptation through the method of neural network. The core of the method is to add MMD to the loss of the original neural network.</p>
<p>The loss function of the neural network is:</p>
<p>$$L_the {DaNN}=L_{NN}+\lambda MMD^2(q_s,q_t)$$</p>
<p>$L_{DaNN}$ is the total loss of my neural network, $L_{NN}$ is the general neural network loss (cross entropy in the text), $\lambda$ is the weight of MMD. $q_s, q_t$ are the representations output by the source domain data $x_s $ and target domain data $x_t$ in the Hidden layer respectively. Suppose the first layer after input is hidden layer $q_s=\sigma(W^Tx_s+b) , q_t=\sigma(W^Tx_t+b)$ .</p>
<p>The method of network update is:</p>
<p>Update network parameters according to $L_{NN}$ backpropagation.<br />Update the parameters of the hidden layer according to $\lambda MMD^2(q_s,q_t)$ (assuming that the hidden layer is the third layer, then only update one to three layers, and do not update the network parameters after the next three layers)</p>
<h3>&nbsp;</h3>
<h3>Ganin, Yaroslav, and Victor Lempitsky. "Unsupervised domain adaptation by backpropagation." International conference on machine learning. PMLR, 2015.</h3>
<p><img src="https://picx.zhimg.com/80/v2-9b5f322cae8aee955bf84614904e3cf2_720w.webp?source=d16d100b" /></p>
<p>paper 6 essentially proposes a neural network structure to find a space that minimizes the distribution distance between the source domain and the target domain. A neural network consists of three parts:</p>
<p>$G_f( ; \theta_f)$ transforms an input $x$ into a feature $f$.<br />$G_y(&middot;;\theta_y)$ Input feature f and output prediction for label $y$.<br />$G_d(&middot;;\theta_d)$ takes in a feature f and outputs a prediction for the domain (source or target domain).</p>
<p>During the training process, we hope that the features obtained by $G_f$ maximize $L_d$, even if the $f_s, f_t $ of the source domain and the target domain are as close as possible. But at the same time we want to get the smallest $L_d$ through $G_d$. Then adjust the rationality of the output $f$ according to $G_y$. In essence, it is an adversarial network, which is trained in this way to obtain a reasonable mapping method $G_f$ to $x$.</p>
<h3>&nbsp;</h3>
<h3>Zhuang, Fuzhen, et al. "Supervised representation learning: Transfer learning with deep autoencoders." Twenty-fourth international joint conference on artificial intelligence. 2015.</h3>
<p><img src="https://picx.zhimg.com/80/v2-3a7a46e5959de3be2bf172841436e5fb_720w.webp?source=d16d100b" /></p>
<p>paper 7 proposes a method to learn and find a new representation through the structure of the autoencoder, which also embeds the label data of the source domain to optimize network training. It should be noted that the autoencoders of the source domain data and the target domain data in the entire model share parameters, and the essence of the model can be glimpsed through the loss function of the model:</p>
<p>$$J = J_r(x, \hat{x}) + &alpha;&Gamma;(&xi; (s) , &xi; (t) ) + &beta;L(&theta;, &xi; ^{(s)} ) + &gamma;&Omega;(W, b,W' , b' )$$</p>
<p>Among them, $J_r$ is the loss caused by the autoencoder to restore the input $x$, $&Omega;(W, b,W' , b' )$ is the complexity of the regular term control parameters, $L(&theta;, &xi; ^{(s)} )$ is predicted by softmax The loss caused by the source domain data label, $&Gamma;(&xi; (s) , &xi; (t) )$ is the loss caused by the KL divergence between $P_s$ and $P_t$, the purpose is to hope that the output $&xi; (s), &xi; (t)$ As approximately as possible, $&Gamma;(&xi; (s) , &xi; (t) ) = D_{KL}(P_s||P_t) + D_{KL}(P_t||P_s)$ where:</p>
<p>$$P_s'=\frac{1}{n_s} \sum_{i=1}^{n_s} &xi; ^{(s)}_i, \,\,P_s = \frac{P_s'}{\sum P_s'}$$</p>
<p>$$P_t'=\frac{1}{n_t} \sum_{i=1}^{n_t} &xi; ^{(t)}_i, \,\,P_t = \frac{P_t'}{\sum P_t'}$$</p>
<p>(Although I personally feel that the mathematical design of this $&Gamma;$ is not perfect, it can indeed achieve the desired effect)</p>
<h3>&nbsp;</h3>
<h3>Long, Mingsheng, et al. "Learning transferable features with deep adaptation networks." International conference on machine learning. PMLR, 2015.</h3>
<p><img src="https://picx.zhimg.com/80/v2-49e55f2a96008e80be03aea5f39078e7_720w.webp?source=d16d100b" /></p>
<p>The above figure shows the algorithm structure proposed in paper 8. I personally feel that this structure is not as clear as in another Review. Here is also the structure diagram in the Review (Zhuang, Fuzhen, et al. "A comprehensive survey on transfer learning."Proceedings of the IEEE109.1 (2020): 43-76.).</p>
<p><img src="https://pic1.zhimg.com/80/v2-a1409a9ebc00db93ca4617d63afeb034_720w.webp?source=d16d100b" /></p>
<p>During the training process, $X_s$ and $X_t$ are fed into the network, and the sixth layer network starts to go to $X_s$ to go to the upper network and $X_t$ to go to the lower network. The upper network can be directly trained because $X_s$ is labeled. But because the target domain has no labels, it is impossible to train the network without special means. What means did the author use? It is to realize the training of the network by minimizing the MK-MMD between the 6-8 layer network in the above figure. When the training reaches a certain level, the following network can be used to directly predict the label of $X_t$ (at least that is what the paper said, it is not very intuitive to me personally, maybe I am not good at mathematics).</p>
<h3>&nbsp;</h3>
<h3>Tzeng, Eric, et al. "Adversarial discriminative domain adaptation." Proceedings of the IEEE conference on computer vision and pattern recognition. 2017.</h3>
<p>This paper feels similar to paper 6, which is 1) predicting domian through a discriminator 2) learning a mapping $M_t$ through an adversarial loss function. The role of $M_t$ is to minimize the distance between the mapped source domain and the target domain, so that other machine learning algorithms can be trained on the mapped data. The core idea of the full text lies in these lines of loss function:</p>
<p><img src="https://picx.zhimg.com/80/v2-749a07cf76d2454e0e1d16eb962b9c07_720w.webp?source=d16d100b" /></p>
<p>The first loss function represents the loss of the classifier (after projection) on the target domain $M_s(X_s)$.</p>
<p>The second loss function represents the loss of the Discriminator (domain classifier).</p>
<p>The third loss function represents the loss of the target domain projection function $M_t$, which is opposite to the loss of the Discriminator (domain classifier), reflecting adversariality.</p>
<p>The training process is as follows:</p>
<p><img src="https://pica.zhimg.com/80/v2-429be0698f9161805f67fdd3428c6667_720w.webp?source=d16d100b" /></p>
<p>1) First, train a classifier on the target domain $M_s(X_s)$ through the first loss function. After completing this step, you will get a classifier $C$ and a source domain projection function M_s. This step corresponds to pre-training. 2) Fix $M_s$ and train a $M_t$ and $D$ through the second loss function and the third loss function. This step corresponds to Adversarial adaptaiton. 3) Use the previously trained $M_s$ and $C$ to predict the label.</p>
</div>
</div>
</div>
