package com.example.movie.ticket.booking.application.utils.crawler;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Review;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.repository.ReviewRepository;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;

import javax.lang.model.element.Element;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeoutException;

@Slf4j
@Component
public class ReviewCrawler {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private long initWaitTime = 1;

    public ReviewCrawler(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        WebDriverManager.chromedriver().setup();
    }

    public void crawlReviewsOfFilm(String url, Movie movie) {
        List<User> userList = userRepository.findAll();
        WebDriver driver = new ChromeDriver();
        try {
            driver.get(url);
            Thread.sleep(4000); // Wait for the dynamic content to load

            // Find review elements using Selenium
            List<WebElement> reviewElements = driver.findElements(By.cssSelector(".relative.w-full.py-5"));
            log.info("Review Elements: {}", reviewElements);
            List<Review> reviewList = parseReview(driver, reviewElements, userList, movie);
            log.info("Review List");
            reviewList.forEach(review -> log.info("Review: {}", review));

            // Save to database
            reviewRepository.saveAll(reviewList);

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error crawling review: {}", e.getMessage());
        } finally {
            driver.close();
        }
    }

    private List<Review> parseReview(WebDriver driver, List<WebElement> reviewElements, List<User> userList, Movie movie) {
        Random random = new Random();
        List<Review> reviewList = new ArrayList<>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        for (WebElement reviewElement : reviewElements) {
            // Random rating from 1 -> 10
            int rating = random.nextInt(10) + 1;
//            if (isElementPresent(driver, reviewElement, ".h-5.w-5.text-yellow-400 + span")) {
//                WebElement ratingElement = reviewElement.findElement(By.cssSelector(".h-5.w-5.text-yellow-400 + span"));
//                log.info("Rating Element: {}", ratingElement);
//
//                rating = Integer.parseInt(ratingElement.getText().split("/")[0]);
//            }

            String createdAtString = reviewElement.findElement(By.cssSelector(".text-xs.text-gray-500")).getText();
            Date createdAt = null;
            try {
                createdAt = formatter.parse(createdAtString);
            } catch (ParseException e) {
                createdAt = new Date();
            }
            Date updatedAt = createdAt;

            String comment = reviewElement.findElement(By.cssSelector(".whitespace-pre-wrap.break-words.text-md.leading-relaxed.text-gray-900")).getText();

            List<String> feelingList = new ArrayList<>();
            List<WebElement> feelingElements = reviewElement.findElements(By.cssSelector(".block.whitespace-nowrap.rounded.bg-blue-50.px-2.py-1.text-sm.leading-4.text-gray-800"));
            if(!feelingElements.isEmpty()) {
                for (WebElement feelingElement : feelingElements) {
                    feelingList.add(feelingElement.getText());
                }
            }

            List<String> imageList = new ArrayList<>();
            List<WebElement> imageElements = reviewElement.findElements(By.cssSelector("img.absolute.inset-0.object-cover"));
            if(!imageElements.isEmpty()) {
                for (WebElement imageElement : imageElements) {
                    imageList.add(imageElement.getAttribute("src"));
                }
            }

            Review review = Review.builder()
                    .user(userList.get(new Random().nextInt(userList.size())))
                    .rating(rating)
                    .createdAt(createdAt)
                    .updatedAt(updatedAt)
                    .comment(comment)
                    .feeling(feelingList)
                    .images(imageList)
                    .movie(movie)
                    .build();

            reviewList.add(review);
        }

        return reviewList;
    }

    public boolean isElementPresent(WebDriver driver, WebElement webElement, String cssSelector) {
        try {
            By locator = By.cssSelector(cssSelector);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(initWaitTime));
            wait.until(ExpectedConditions.visibilityOfNestedElementsLocatedBy(webElement, locator));
            return webElement.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
