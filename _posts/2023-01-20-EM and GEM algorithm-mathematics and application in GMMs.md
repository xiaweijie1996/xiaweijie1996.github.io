---
title: EM and GEM algorithm-mathematics and application in GMMs
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


<p>In this article, I would like to discuss the Expectation maximization algorithm (EM) and its related application in Gaussian mixture models (GMMs).</p>
<hr style="filter: alpha(opacity=100,finishopacity=0,style=3);" size="3" width="80%" />
<p><strong>Content</strong></p>
<ul>
<li>Introduction to EM algorithm</li>
<li>EM algorithm derivation</li>
<li>Convergence of EM Algorithm</li>
<li>EM algorithm in GMMs</li>
<li>General EM</li>
<li>Appendix:Jensen inequality</li>
</ul>
<p>&nbsp;</p>
<h3><strong>Introduction to EM algorithm</strong></h3>
<p>EM algorithm is an iterative algorithm which Dempster proposed in 1977. EM algorithm is used for the estimation of hidden variables in the probability models. EM algorithm has two steps: E step, compute the expectation; M step, find the maximization. This is why it is called EM algorithm.</p>
<p>probability models sometimes have not only observable variables but also hidden variables. If all variables are observable, then the parameters of the probability models can be estimated by the maximum likelihood estimation. However, sometimes there are hidden variables. <strong>EM algorithm is used to estimate the parameters of probability models with hidden variables using maximum likelihood estimation.</strong>&nbsp;</p>
<p>An example:</p>
<p>If there are three coins, which are $A,B,C$. The probability of the coins coming up heads are $\pi,p,q$, respectively. Conducting the following experiment: First toss coin $A$, if the result is head up, then toss $B$, otherwise, toss $C$. If the result of the second toss is heads, then record $1$. Otherwise, record $0$. Repeat experiment $n$ times. if $n=10$, we observe the result:</p>
<p>$$1,1,0,1,0,0,1,0,1,1$$</p>
<p>Assuming we can only observe the results of the second toss, how do we estimate the probability that the toss is heads?</p>
<p>Answer:</p>
<p>$$\begin{align*}&nbsp; P(y|\theta) &amp;=\sum_z P(y,z|\theta) \\ &amp;= \sum_z P(z|\theta)P(y|z,\theta)\\ &amp;= \pi p^{y}(1-p)^{1-y}+(1-\pi)q^{y}(1-q)^{1-y} \end{align*}$$</p>
<p>Where $y$ is the observable variable, its value is $1$ or $0$. $z$ is the hidden variable which represents the toss result of $A$, $\theta=(\pi, p, q)$ is the parameters of the probability model.&nbsp;</p>
<p>Using $Y=(Y_1,...,Y_n)^{T}$ represents the observable results, and&nbsp; $Z=(Z_1,...,Z_n)^{T}$ reprents the unobservable results. The likelihood function of the observable data is:</p>
<p>$$\begin{align*}&nbsp; P(Y|\theta) &amp;= \sum_{Z} P(Z|\theta)P(Y|Z,\theta) \\ &amp;=\prod_{Z} \pi p^{y}(1-p)^{1-y}+(1-\pi)q^{y}(1-q)^{1-y} \end{align*}$$</p>
<p>Then the method is to find the maximum likelihood estimation:</p>
<p>$$\hat{\theta} = \arg \max_{\theta} \log P(Y|\theta)$$</p>
<p>The method randomly selects the initial value and then does the iteration. However, the different initial values will get different results. <strong>The EM algorithm is sensitive to the initial values.</strong>&nbsp;</p>
<p>Usually, $Y$ is used to represent the data of observable variables, $Z$ represents the data of hidden variables. $(Y,Z)$ together is called complete-data, and $Y$ is called incompleted-data. The distribution of $Y$ is $P(Y|\theta)$, log-likelihood is &nbsp;$\log P(Y|\theta)$. The joint distribution of $(Y,Z)$ is $P(X,Y|\theta)$, and the log-likelihood is $\log P(X,Y|\theta)$.</p>
<p><strong>Algorithm EM</strong></p>
<p>Input: $Y,Z,P(Z|Y,\theta),P(Y,Z|\theta)$</p>
<p>Output: $\theta$</p>
<ol>
<li>Select the initial values $\theta^{(0)}$.</li>
<li>E step: Using $\theta^{(i)}$ as the approximation of $\theta$ in (i+1) iteration, compute:$$\begin{align*} Q(\theta,\theta^{(i)}) &amp;=\mathbb{E_{z}} \left[P(Z,Y|\theta)P(Z|Y,\theta^{(i)}) \right] \\&amp;= \sum_{Z} P(Z,Y|\theta)P(Z|Y,\theta^{(i)}) \end{align*}$$</li>
<li>M step: find $\theta$ which gives the smallest $Q(\theta,\theta^{(i)})$:$$\theta^{(i+1)} = \arg \max_{\theta} Q(\theta,\theta^{(i)})$$</li>
<li>Repeat steps (2) and (3) until convergence, the stop condition is usually a small positive number $\epsilon$</li>
</ol>
<p><strong>Definition: </strong>&nbsp;$Q\,\, function$ is the expectation of log-likelihood of $\log P(Z|Y,\theta)$ for $Z$ with the distribution of $P(Z|Y,\theta^{(i)})$ when knowing $Y, \theta^{(i)}$.</p>
<p> $$Q(\theta,\theta^{(i)}) =\mathbb{E_{z}} \left[P(Z,Y|\theta)P(Z|Y,\theta^{(i)}) \right]$$</p>


<h3>EM algorithm derivation</h3>
<p>We have discussed the EM algorithm, but why EM algorithm can realize the maximum likelihood estimation for the probability model with hidden variables? we will discuss in this section.</p>
<p>Our goal is to maximize the likelihood, which is:</p>
<p>$$L(\theta)=\log P(Y|\theta) \log P(Y,Z|\theta)= \log (\sum_{Z} P(Y|Z,\theta)P(Z|\theta))$$</p>
<p>Actually, the EM algorithm approaches the maximum likelihood by iteration. Assuming after i iteration, $\theta^{(i)}$ is the estimated parameters. we hope $L(\theta)&gt;L(\theta^{(i)})$.The difference between $L(\theta)$ and $L(\theta^{(i)})$ is：</p>
<p>$$L(\theta)-L(\theta^{(i)})= \log (\sum_{Z} P(Y|Z,\theta)P(Z|\theta))-\log P(Y|\theta^{(i)})$$</p>
<p>According to Jensen inequality (See Jensen inequality at the end):</p>
<p>$$\begin{align*} L(\theta)-L(\theta^{(i)})&amp;=\log (\sum_{Z} P(Y|Z,\theta^{(i)}) \frac{P(Y|Z,\theta)P(Z|\theta)}{P(Y|Z,\theta^{(i)})})- \log P(Y|\theta^{(i)})\\ &amp;\geq \sum_{Z} P(Z|Y,\theta^{(i)}) \log( \frac{P(Y|Z,\theta)P(Z|\theta)}{P(Y|Z,\theta^{(i)})})-\log P(Y|\theta^{(i)}) \\ &amp;= \sum_{Z} P(Z|Y,\theta^{(i)}) \log(\frac{P(Y|Z,\theta)P(Z|\theta)}{P(Y|Z,\theta^{(i)}P(Y|\theta^{(i)})}) \end{align*} $$</p>
<p>Note:$\sum_{Z} P(Z|Y,\theta^{(i)})=1$</p>
<p>Define $B \,\, function$:</p>
<p>$$B(\theta,\theta^{(i)})=L(\theta^{(i)})+\sum_{Z} P(Z|Y,\theta^{(i)}) \log(\frac{P(Y|Z,\theta)P(Z|\theta)}{P(Y|Z,\theta^{(i)})P(Y|\theta^{(i)})})$$</p>
<p>$$\rightarrow L(\theta) \geq B(\theta,\theta^{(i)})$$</p>
<p>That means $B(\theta,\theta^{(i)})$ is the lower bound of the $L(\theta)$, and we could know that $L(\theta^{(i)})=B(\theta^{(i)},\theta^{(i)})$.</p>
<p>Therefore, we want to find a $\theta^{(i+1)}$ which maximize the $B(\theta,\theta^{(i)})$:</p>
<p>$$\begin{align*}\theta^{(i+1)} &amp;=\arg \max_{\theta}B(\theta,\theta^{(i)})\\ &amp;=\arg \max_{\theta} (L(\theta^{(i)})+\sum_{Z} P(Z|Y,\theta^{(i)}) \log(\frac{P(Y|Z,\theta)P(Z|\theta)}{P(Y|Z,\theta^{(i)})P(Y|\theta^{(i)})}))\\&amp;= \arg \max_{\theta}(\sum_{Z} P(Y|Z,\theta)P(Z|\theta))\\ &amp;= \arg \max_{\theta}(\sum_{Z} P(Y,Z|\theta)) \\ &amp;=\arg \max_{\theta} Q(\theta,\theta^{(i)}) \end{align*}$$</p>
<p>We now have proof that, by maximizing $Q\,\, funciton$, we essentially maximize the $B\,\,function$, which is the lower bound of the $L(\theta)$, and indirectly maximizing the $L(\theta)$. The figure below shows how $L(\theta)$ increases with the lower bound.</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.postimg.cc/Y07ZWZN8/We-Chat-Image-20230121003101.jpg" alt="EM algorithm optimization" width="528" height="380" /></p>

<h3>Convergence of EM Algorithm</h3>
<p>EM algorithm provides a method to estimate the maximum likelihood of probability models with hidden variables. we have proof that the EM algorithm is able to optimize the lower bound of the likelihood. But there is still a problem we have not considered, which is the convergence of the EM algorithm.</p>
<p>According the EM algorithm, we know that the $P(Y|\theta^{(i)}), \,i=[1,2,3,...]$ is nondecreasing. which means:</p>
<p>$$P(Y|\theta^{(i+1)})\geq P(Y|\theta^{(i)})$$</p>
<p>Because:</p>
<p>$$P(Y|\theta)=\frac{P(Y,Z|\theta)}{P(Z|Y,\theta)}$$</p>
<p>$$\rightarrow \log P(Y|\theta)=\log{P(Y,Z|\theta)}-\log {P(Z|Y,\theta)}$$</p>
<p>Define $H(\theta,\theta^{(i)}),Q'(\theta,\theta^{(i)})$ :<br />$$H(\theta,\theta^{(i)})=\sum_{Z} \log P(Z|Y,\theta)P(Z|Y,\theta)^{(i)}$$</p>
<p>$$Q'(\theta,\theta^{(i)})=\sum_{Z} \log P(Y,Z|\theta)P(Z|Y,\theta^{(i)})$$</p>
<p>Then the log-likelihood can be written as:</p>
<p>$$\log P(Y|\theta)=Q'(\theta,\theta^{(i)})-h(\theta,\theta^{(i)})$$</p>
<p>Then:</p>
<p>$$ \log P(Y|\theta^{(i+1)})-\log P(Y|\theta^{(i+1)}) \\ =\left [ Q'(\theta,\theta^{(i+1)})-Q'(\theta,\theta^{(i)})\right]-\left[H(\theta,\theta^{(i+1)})-H(\theta,\theta^{(i)}) \right]&nbsp;$$</p>
<p>For the first part of the equation above, obviously, we have the following:</p>
<p>$$Q'(\theta,\theta^{(i+1)})-Q'(\theta,\theta^{(i)})\geq 0$$</p>
<p>For the second part:</p>
<p>$$\begin{align*} H(\theta,\theta^{(i+1)})-H(\theta,\theta^{(i)}) &amp;=\sum_{Z} (\log\frac{P(Z|Y,\theta^{(i+1)})}{P(Z|Y,\theta^{(i)})}P(Z|\theta^{(i)})) \\&nbsp; &amp; \leq \log(\sum_{Z} \frac{P(Z|Y,\theta^{(i+1)})}{P(Z|Y,\theta^{(i)})}P(Z|\theta^{(i)}) \\ &amp;= \log(\sum_{Z}P(Z|Y,\theta^{(i+1)})) =0 \end{align*}$$</p>
<p>Note: Jensen inequality is used in the derivation.</p>
<p>$$\log P(Y|\theta^{(i+1)})-\log P(Y|\theta^{(i+1)}) \\ = \overbrace{\left [ Q'(\theta,\theta^{(i+1)})-Q'(\theta,\theta^{(i)})\right]}^{&gt;0}-\underbrace{\left[H(\theta,\theta^{(i+1)})-H(\theta,\theta^{(i)}) \right] }_{&lt;0}\geq 0$$</p>
<p>If $P(Y|\theta)$ has upper boundary, then the $L(\theta^{(i)})$ will converge to a specific value.</p>


<h3>EM algorithm in GMMs</h3>
<p>One important application of EM algorithm is GMMs.</p>
<p>Definition of GMMs: Gaussian mixture model refers to the probability model that has the following distribution:</p>
<p>$$P(y|\theta)=\sum_{k=1}^{K} \alpha_{k} \phi(y|\theta_k)$$</p>
<p>where $\alpha_k$ is the coefficient, $\alpha_k \geq 0, \sum_{k=1}^{K} \alpha_k =1$, and $\theta_k =(\mu_k,\sigma_{k}^2)$ is the parameters of the kth model:</p>
<p>$$\phi(y|\theta_k)=\frac{1}{\sqrt{2 \pi} \sigma_k} \exp(-\frac{(y-\mu_k)^2}{2\sigma^2})$$</p>
<p>We can imagine an experiment in which we first choose a Gaussian distribution model according to $\alpha$ and then generate the observable data $y$ by sampling data from the Gaussian distribution model selected in the previous step.</p>
<p>Assuming the observable variable is $y_i, i \in \left[ 1,2,...,N \right]$. The unobservable variable is $\gamma_{jk}$, $k \in \left[ 1,2,...,N \right]$ is the number of Gaussian distribution models, the value of $\gamma_{jk}$ is:</p>
<p>$$ \gamma_{jk}=\left\{ \begin{aligned}&amp; 1, the \,data\,of\, y_j\, comes\,from\,model\, k&nbsp; \\&nbsp; &amp; 0, otherwise \end{aligned} \right.\\ j=1,2,..N \,\,\, k=1,2,3,..N $$</p>
<p>With the observable data and unobservable data, the completed data is:</p>
<p>$$(y_j, \gamma_{j1},\gamma_{j2},..,\gamma_{jk}), \,\,\,j \in \left[1,2,..N&nbsp; \right\]$$</p>
<p>The maximum likelihood function of completed data:</p>
<p>$$\begin{align*}&nbsp; P(y,\gamma|\theta) &amp;=\prod_{j=1}^{N} P(y_j, \gamma_{j1},\gamma_{j2},..,\gamma_{jk}|\theta) \\&amp;=\prod_{k=1}^{k} \prod_{j=1}^{N} \left[ \alpha_k \phi_k(y_j|\theta_k) \right]^\gamma_{jk}\\ &amp;=\prod_{k=1}^{k} \alpha^{k]^{n_k} \prod_{j=1}^{N}&nbsp; \left[ \phi_k(y_j|\theta_k) \right]^\gamma_{jk}\end{align*}$$</p>
<p>&nbsp;</p>

updata soon...